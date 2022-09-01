import React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

export interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
}

export interface Condition {
  id: string;
}

export interface Action {
  id: string;
  position: string;
  action: string;
  ticker: string;
  shares: number;
  price: number;
  type: string;
  value: string;
  timeinforce: string;
  exthours: string;
}
