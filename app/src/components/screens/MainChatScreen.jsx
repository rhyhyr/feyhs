import React, { useState, useRef, useEffect } from 'react';
import { BackIcon, SendIcon } from '../Icons';
import BottomNav from '../BottomNav';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const MainChatScreen = ({ getScreenClass, back, navigate, showToast }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '안녕하세요! 유학생 관련 무엇이든 질문해보세요 😊' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // 새 메시지 올 때마다 스크롤 아래로
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || loading) return;

    // 1. 내 질문 바로 화면에 표시
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);

    try {
      // 2. 백엔드로 질문 전송
      const res = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error('서버 오류');

      const data = await res.json();

      // 3. AI 답변 화면에 표시
      setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: '죄송해요, 답변을 가져오지 못했어요. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={getScreenClass('s-main')} id="s-main">
      <div className="topbar">
        <div className="tb-back" onClick={back}>
          <BackIcon />
        </div>
        <div>
          <div className="tb-title">메인 채팅</div>
          <div className="tb-sub">모든 채널에 질문하기</div>
        </div>
      </div>

      <div className="scroll-area">
        <div className="chat-area" style={{ paddingTop: '12px' }}>
          {messages.map((msg, i) =>
            msg.role === 'user' ? (
              <div key={i} className="msg-user">
                <div className="bubble-user">{msg.text}</div>
              </div>
            ) : (
              <div key={i} className="msg-ai">
                <div className="ai-av">AI</div>
                <div className="bubble-ai" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              </div>
            )
          )}

          {/* 로딩 중 점점점 표시 */}
          {loading && (
            <div className="msg-ai">
              <div className="ai-av">AI</div>
              <div className="bubble-ai" style={{ color: 'var(--c-t3)' }}>답변 생성 중...</div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
        <div style={{ height: '16px' }} />
      </div>

      <div className="chat-input-bar">
        <input
          className="c-input"
          placeholder="무엇이든 질문하세요..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button className="send-btn" onClick={sendMessage} disabled={loading}>
          <SendIcon />
        </button>
      </div>

      <BottomNav active="s-main" navigate={navigate} />
    </div>
  );
};

export default MainChatScreen;
