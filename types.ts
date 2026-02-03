import React from 'react';

export interface Review {
  id: number;
  name: string;
  age: number;
  quote: string;
  detail: string;
  rating: number;
  image?: string;
}

export interface TimelineItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}