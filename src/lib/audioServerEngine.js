/**
 * Dấu Ấn Studio — Server Audio Engine & Liveness Verification Security
 */

/**
 * Generates a randomized 4-digit live verification code
 * to prevent Unauthorized Voice Cloning & Deepfake Fraud
 */
export function generateLiveVerificationCode() {
  const code = Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toLocaleDateString('vi-VN');
  return {
    code,
    phrase: `Tôi là chính chủ, xác nhận tạo Voice Clone trên Dấu Ấn Studio ngày ${now} với mã ${code}.`,
  };
}

/**
 * Server TTS Audio Synthesis Fallback Helper
 * Ensures consistent audio rendering across Mac, Windows, iOS, and Android
 */
export async function synthesizeServerAudio({ text, voiceId, pitch = 0.94, rate = 0.92 }) {
  // If server TTS endpoint is configured via environment variables
  if (import.meta.env.VITE_SERVER_TTS_URL) {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER_TTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId, pitch, rate }),
      });
      const data = await response.json();
      return { success: true, audioUrl: data.audioUrl };
    } catch (e) {
      console.warn('Server TTS failed, falling back to Web Speech API:', e);
    }
  }

  // Fallback to local browser Web Speech API
  return { success: false, mode: 'client-web-speech' };
}
