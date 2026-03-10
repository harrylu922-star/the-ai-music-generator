"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface GlobalTrack {
  audioSrc: string;
  title: string;
  description?: string;
  category?: string;
}

interface GlobalPlayerState {
  track: GlobalTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

interface GlobalPlayerContextValue extends GlobalPlayerState {
  play: (track: GlobalTrack) => void;
  pause: () => void;
  toggle: () => void;
  seek: (fraction: number) => void;
  close: () => void;
  /** Internal: used by GlobalPlayer to register the audio element */
  setAudioRef?: (el: HTMLAudioElement | null) => void;
}

const defaultState: GlobalPlayerState = {
  track: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
};

const GlobalPlayerContext = createContext<GlobalPlayerContextValue | null>(null);

export function GlobalPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<GlobalPlayerState>(defaultState);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const play = useCallback((track: GlobalTrack) => {
    setState((s) => ({
      ...s,
      track,
      isPlaying: true,
      currentTime: 0,
      duration: s.track?.audioSrc === track.audioSrc ? s.duration : 0,
    }));
  }, []);

  const toggle = useCallback(() => {
    if (!state.track) return;
    if (state.isPlaying) {
      pause();
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      setState((s) => ({ ...s, isPlaying: true }));
    }
  }, [state.track, state.isPlaying, pause]);

  const seek = useCallback((fraction: number) => {
    const el = audioRef.current;
    if (!el || !Number.isFinite(el.duration)) return;
    const time = fraction * el.duration;
    el.currentTime = time;
    setState((s) => ({ ...s, currentTime: time }));
  }, []);

  const close = useCallback(() => {
    pause();
    setState(defaultState);
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  }, [pause]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTimeUpdate = () => setState((s) => ({ ...s, currentTime: el.currentTime }));
    const onDurationChange = () => setState((s) => ({ ...s, duration: el.duration }));
    const onEnded = () => setState((s) => ({ ...s, isPlaying: false, currentTime: 0 }));
    const onPlay = () => setState((s) => ({ ...s, isPlaying: true }));
    const onPause = () => setState((s) => ({ ...s, isPlaying: false }));
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("durationchange", onDurationChange);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("durationchange", onDurationChange);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [state.track?.audioSrc]);

  const value: GlobalPlayerContextValue = {
    ...state,
    play,
    pause,
    toggle,
    seek,
    close,
    setAudioRef: (ref) => {
      audioRef.current = ref;
    },
  };

  return (
    <GlobalPlayerContext.Provider value={value}>
      {children}
    </GlobalPlayerContext.Provider>
  );
}

export function useGlobalPlayer() {
  const ctx = useContext(GlobalPlayerContext);
  if (!ctx) throw new Error("useGlobalPlayer must be used within GlobalPlayerProvider");
  return ctx;
}
