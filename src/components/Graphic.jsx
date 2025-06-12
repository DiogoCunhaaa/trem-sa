import { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const dadosPassageiros = [
  { hora: '08:00', passageiros: 2000 },
  { hora: '10:00', passageiros: 3000 },
  { hora: '12:00', passageiros: 5000 },
  { hora: '14:00', passageiros: 3000 },
  { hora: '16:00', passageiros: 4000 },
  { hora: '18:00', passageiros: 6000 },
  { hora: '20:00', passageiros: 4000 },
  { hora: '21:00', passageiros: 2000 },
];

export default function Graphic({ data, barDataKey, label }) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data}>
        <XAxis dataKey='hora' />
        <YAxis
          label={{
            value: label,
            angle: -90,
            position: 'insideLeft',
            offset: 0,
            style: {
                textAnchor: 'middle' 
            }
          }}
        />
        <Bar dataKey={barDataKey} fill='#979797' />
      </BarChart>
    </ResponsiveContainer>
  );
}
