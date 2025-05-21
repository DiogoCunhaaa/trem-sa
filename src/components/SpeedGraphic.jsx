import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const dadosVelocidade = [
    { hora: '08:00', velocidade: 15 },
    { hora: '10:00', velocidade: 30 },
    { hora: '12:00', velocidade: 30 },
    { hora: '14:00', velocidade: 45 },
    { hora: '16:00', velocidade: 60 },
    { hora: '18:00', velocidade: 70 },
    { hora: '20:00', velocidade: 75 },
    { hora: '21:00', velocidade: 30 }
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dadosVelocidade}>
          <XAxis dataKey="hora" />
          <YAxis label={{ value: 'km/h', angle: -90, position: 'insideLeft'}} />
          <Bar dataKey="velocidade" fill="#979797" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}