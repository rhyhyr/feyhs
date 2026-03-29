import React, { useState } from 'react';
import { BackIcon, SendIcon } from '../Icons';

const VisaScreen = ({ navigate, back, getScreenClass, showToast }) => {
  const [infoOpen, setInfoOpen] = useState(true);

  return (
    <div className={getScreenClass('s-visa')} id="s-visa">
      <div className="slim-header">
        <div className="tb-back" onClick={back}>
          <BackIcon />
        </div>
        <div className="slim-ch-icon" style={{ background: 'var(--c-purple-l)' }}>🛂</div>
        <div className="slim-ch-name">비자 & 체류</div>
        <div className="slim-rag">RAG 활성</div>
        <div className="slim-d87" onClick={() => setInfoOpen(o => !o)}>
          <span id="d87-txt">D-87</span>
          <span id="d87-arrow" style={{ fontSize: '10px' }}>{infoOpen ? '▾' : '▸'}</span>
        </div>
      </div>
      {infoOpen && (
        <div className="info-panel" id="info-panel">
          <div className="i-chip">🗓 D-2 만료 <strong>2026. 8. 15</strong></div>
          <div className="i-chip green">🔔 알림 설정됨</div>
        </div>
      )}
      <div className="qa-scroll">
        <button className="qa-btn" onClick={() => navigate('s-step')}>📋 비자 연장 절차</button>
        <button className="qa-btn" onClick={() => showToast('외국인등록증 재발급 안내를 불러옵니다')}>🪪 외국인등록증</button>
        <button className="qa-btn" onClick={() => showToast('체류확인서 발급 안내를 불러옵니다')}>📄 체류확인서</button>
        <button className="qa-btn" onClick={() => showToast('비자 변경 절차 안내를 불러옵니다')}>🔄 비자 변경</button>
      </div>
      <div className="scroll-area">
        <div className="chat-area" id="visa-chat-area">
          <div className="msg-ai">
            <div className="ai-av">AI</div>
            <div className="bubble-ai">D-2 채널입니다. 만료까지 <strong>87일</strong> 남았어요. 위 버튼을 탭하거나 직접 질문해주세요!</div>
          </div>
        </div>
        <div style={{ height: '8px' }} />
      </div>
      <div className="chat-input-bar">
        <input className="c-input" id="visa-input" placeholder="비자 관련 질문하기..." />
        <button className="send-btn" onClick={() => showToast('메시지를 전송합니다')}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default VisaScreen;
