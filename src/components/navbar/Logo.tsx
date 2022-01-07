import React from 'react'
import { useTrail, a } from '@react-spring/web';

const Logo: React.FC = () => {

  const arr = 'TriadaWork'.split('')

  const to = () => ({
    color: 'var(--to)',
  });
  const from = () => ({
    color: 'var(--from)',
  });

  const [trail] = useTrail(arr.length, (i) => ({
    ...to(),
    from: from(),
    loop: {
      reverse: true,
    },
  }));

  return (
    <div className='logo'>
      {trail.map((style, i) => (
        <a.div key={i} style={style}>
          {arr[i]}
        </a.div>
      ))}
    </div>
  )
}

export default Logo
