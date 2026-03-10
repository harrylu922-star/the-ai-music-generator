"use client";

import { useState, useEffect } from "react";

const COOKIE_NAME = "app_login_preview";

/** 开发/预览用：从 cookie 读取登录状态。在控制台设置 document.cookie = "app_login_preview=1" 可预览登录态。正式上线后改为从 auth 上下文读取。 */
export function useLoginPreview(): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const raw = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
    setIsLoggedIn(raw ? raw[2] === "1" : false);
  }, []);

  return isLoggedIn;
}
