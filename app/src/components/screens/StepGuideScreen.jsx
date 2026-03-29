import React, { useState } from 'react';
import { BackIcon } from '../Icons';

const StepGuideScreen = ({ back, getScreenClass, showToast }) => {
  // 단계 체크 상태 (원본 HTML과 동일: 1,2번 checked, 3번 current)
  const [steps, setSteps] = useState([
    { id: 1, text: '여권 원본 + 사본 1부', sub: '유효기간 6개월 이상', checked: true, current: false },
    { id: 2, text: '외국인등록증 원본', sub: '', checked: true, current: false },
    { id: 3, text: '재학증명서 (영문) 발급', sub: '포털 → 증명서 발급 → 영문 재학증명서', checked: false, current: true },
    { id: 4, text: '수수료 60,000원 준비', sub: '', checked: false, current: false },
    { id: 5, text: '출입국관리사무소 방문 예약', sub: 'Hi Korea에서 사전 예약 필수', checked: false, current: false },
    { id: 6, text: '방문 접수 및 수령', sub: '처리 기간 약 5~7 영업일', checked: false, current: false },
  ]);

  const checkedCount = steps.filter(s => s.checked).length;
  const total = steps.length;
  const pct = Math.round(checkedCount / total * 100);
  const grp1Checked = steps.slice(0, 4).filter(s => s.checked).length;
  const grp2Checked = steps.slice(4).filter(s => s.checked).length;

  // 원본 JS toggleStep과 동일 로직
  function toggleStep(id) {
    setSteps(prev => {
      const updated = prev.map(s => {
        if (s.id === id) {
          const nowChecked = !s.checked;
          return { ...s, checked: nowChecked, current: !nowChecked };
        }
        return s;
      });
      if (updated.filter(s => s.checked).length === total) {
        showToast('🎉 모든 단계를 완료했습니다!');
      }
      return updated;
    });
  }

  return (
    <div className={getScreenClass('s-step')} id="s-step">
      <div className="topbar">
        <div className="tb-back" onClick={back}>
          <BackIcon />
          비자 채널
        </div>
      </div>
      <div style={{ padding: '12px 16px 4px' }}>
        <div className="tb-title" style={{ fontSize: '17px' }}>D-2 비자 연장 절차</div>
        <div className="tb-sub">출입국관리사무소 방문 기준</div>
      </div>
      <div className="progress-wrap">
        <div className="progress-bg">
          <div className="progress-fill" id="prog-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="prog-label">
          <span id="prog-txt">{checkedCount} / {total} 단계 완료</span>
          <span id="prog-pct" style={{ color: 'var(--c-green)' }}>{pct}%</span>
        </div>
      </div>
      <div className="scroll-area" style={{ paddingBottom: '12px' }}>
        <div className="step-card">
          <div className="step-card-hdr">
            <span>📁 서류 준비</span>
            <span id="grp1-prog" style={{ fontSize: '11px', fontWeight: 400 }}>{grp1Checked}/4 완료</span>
          </div>
          {steps.slice(0, 4).map(step => (
            <div key={step.id} className="step-row" onClick={() => toggleStep(step.id)}>
              <div className={`step-cb${step.checked ? ' checked' : step.current ? ' current' : ''}`}>
                {step.checked ? '✓' : ''}
              </div>
              <div className="step-label">
                <div className={`step-text${step.checked ? ' done' : ''}`} style={!step.checked && !step.current ? { color: 'var(--c-t3)' } : {}}>
                  {step.text}
                </div>
                {step.sub && (
                  <div className={`step-sub${step.checked ? ' done' : ''}`} style={!step.checked && !step.current ? { color: 'var(--c-t3)' } : {}}>
                    {step.sub}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="step-card">
          <div className="step-card-hdr">
            <span>📋 신청</span>
            <span style={{ fontSize: '11px', fontWeight: 400 }}>{grp2Checked}/2 완료</span>
          </div>
          {steps.slice(4).map(step => (
            <div key={step.id} className="step-row" onClick={() => toggleStep(step.id)}>
              <div className={`step-cb${step.checked ? ' checked' : ''}`}>
                {step.checked ? '✓' : ''}
              </div>
              <div className="step-label">
                <div className={`step-text${step.checked ? ' done' : ''}`} style={{ color: step.checked ? undefined : 'var(--c-t3)' }}>
                  {step.text}
                </div>
                {step.sub && (
                  <div className={`step-sub${step.checked ? ' done' : ''}`} style={{ color: step.checked ? undefined : 'var(--c-t3)' }}>
                    {step.sub}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="save-note">✅ 체크 상태는 자동 저장됩니다. 앱을 닫아도 유지돼요.</div>
        <div style={{ margin: '4px 14px' }}>
          <button className="qa-btn" style={{ width: '100%', textAlign: 'left', borderRadius: '11px', padding: '12px 14px' }} onClick={() => showToast('주의사항을 불러옵니다')}>⚠️ 주의사항 더 보기</button>
        </div>
      </div>
    </div>
  );
};

export default StepGuideScreen;
