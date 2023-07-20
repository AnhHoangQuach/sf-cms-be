const randomNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};
export const zones = [
  {
    zone: 'LEVEL_1',
    cronTime: '*/1 * * * *',
    betDurationInMinutes: 1,
  },
  {
    zone: 'LEVEL_2',
    cronTime: '*/1 * * * *',
    betDurationInMinutes: 1,
  },
  {
    zone: 'LEVEL_3',
    cronTime: '*/3 * * * *',
    betDurationInMinutes: 3,
  },
  // {
  //   zone: 'LEVEL_5',
  //   cronTime: '*/5 * * * *',
  //   betDurationInMinutes: 5,
  // },
  // {
  //   zone: 'LEVEL_10',
  //   cronTime: '*/10 * * * *',
  //   betDurationInMinutes: 10,
  // },
];

export const gateConfig = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
};

// export function gererateResult(lenght?: number) {
//   const result = [];
//   for (let i = 0; i < lenght; i += 1) {
//     result.push(randomNumber());
//   }
//   return result.join('');
// }
export function gererateResultABCD(lenght?: number) {
  const result = ['A,B', 'A,C', 'A,D', 'B,C', 'B,D', 'C,D'];
  return result[Math.floor(Math.random() * (result.length - 1))];
}

export function getWinResult(_result) {
  return _result.split(',');
}
export function getRate() {
  return 1.8;
}
