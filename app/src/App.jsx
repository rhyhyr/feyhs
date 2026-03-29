import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════
   원본 HTML(iphone15.html) 과 완전히 동일하게 구현
══════════════════════════════════════════════════════ */





import VisaScreen from "./components/screens/VisaScreen";
import HomeScreen from "./components/screens/HomeScreen";
import { BackIcon, SendIcon, SearchIcon } from "./components/Icons";

import BottomNav from "./components/BottomNav";

import CalendarScreen from "./components/screens/CalendarScreen";
import StepGuideScreen from "./components/screens/StepGuideScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import SearchScreen from "./components/screens/SearchScreen";
import OnboardingScreen from "./components/screens/OnboardingScreen";
import KnowledgeDetailScreen from "./components/screens/KnowledgeDetailScreen";
import ChannelMainScreen from "./components/screens/ChannelMainScreen";
import MainChatScreen from "./components/screens/MainChatScreen";

/* ══════════════════════════════
   메인 앱 컴포넌트
══════════════════════════════ */
export default function YHSApp() {
  const [current, setCurrent] = useState('s-home');
  const [prev, setPrev] = useState(null);
  const [historyStack, setHistoryStack] = useState(['s-home']);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  function navigate(id) {
    if (id === 'notif-placeholder') { showToast('알림 화면으로 이동합니다'); return; }
    if (id === current) return;
    setPrev(current);
    setCurrent(id);
    setHistoryStack(h => [...h, id]);
  }

  function back() {
    if (historyStack.length <= 1) return;
    const newStack = [...historyStack];
    newStack.pop();
    const nextScreen = newStack[newStack.length - 1];
    setPrev(current);
    setCurrent(nextScreen);
    setHistoryStack(newStack);
  }

  function showToast(msg) {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  }

  function getScreenClass(id) {
    if (id === current) return 'screen active';
    if (id === prev) return 'screen exit-left';
    return 'screen';
  }

  return (
    <div className="iphone">
      {/* Dynamic Island */}
      <div className="dynamic-island">
        <div className="di-sensor" />
        <div className="di-camera" />
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <span>9:41</span>
        <div className="sb-right">
          <div className="sb-signal">
            <div className="sb-bar" style={{ height: '4px' }} />
            <div className="sb-bar" style={{ height: '6px' }} />
            <div className="sb-bar" style={{ height: '9px' }} />
            <div className="sb-bar" style={{ height: '12px' }} />
          </div>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect x="0" y="3" width="13" height="9" rx="2" stroke="#1A1916" strokeWidth="1.5" />
            <rect x="1.5" y="4.5" width="8" height="6" rx="1" fill="#1A1916" />
            <path d="M14 5v4a2 2 0 000-4z" fill="#1A1916" opacity=".4" />
          </svg>
          <span style={{ fontSize: '13px' }}>95%</span>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="home-indicator" />

      {/* ══════ SCREENS ══════ */}
      <div className="screens">

        <HomeScreen navigate={navigate} getScreenClass={getScreenClass} showToast={showToast} />

        <VisaScreen
          navigate={navigate}
          back={back}
          getScreenClass={getScreenClass}
          showToast={showToast}
        />

        <StepGuideScreen
          back={back}
          getScreenClass={getScreenClass}
          showToast={showToast}
        />

        <MainChatScreen
          getScreenClass={getScreenClass}
          back={back}
          navigate={navigate}
          showToast={showToast}
        />

        {/* ⑤ CALENDAR */}
        <CalendarScreen navigate={navigate} getScreenClass={getScreenClass} showToast={showToast} />

        <ChannelMainScreen
          getScreenClass={getScreenClass}
          back={back}
          showToast={showToast}
          navigate={navigate}
        />

        <KnowledgeDetailScreen
          getScreenClass={getScreenClass}
          back={back}
          showToast={showToast}
          navigate={navigate}
        />

        <OnboardingScreen
          getScreenClass={getScreenClass}
          showToast={showToast}
          navigate={navigate}
        />

        <ProfileScreen
          getScreenClass={getScreenClass}
          showToast={showToast}
          navigate={navigate}
        />

        <SearchScreen
          getScreenClass={getScreenClass}
          showToast={showToast}
          navigate={navigate}
        />

      </div>{/* /screens */}

      {/* Toast */}
      <div className={`toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>
    </div>
  );
}