const formulaETeams = [
    {
      name: 'ABT CUPRA Formula E Team',
      colorMain: '#194997',
      imageCar: '',
      wins: 14,
      podiums: 47,
      races: 115,
      pilots: [
        {
          number: 11,
          name: 'Nico',
          lastName: 'Mueller'
        },
        {
          number: 51,
          name: 'Robin',
          lastName: 'Frijns'
        }
      ]
    },
    {
      name: 'Avalanche Andretti Formula E',
      colorMain: '#ff0000',
      imageCar: '',
      wins: 8,
      podiums: 25,
      races: 108,
      pilots: [
        {
          number: 27,
          name: 'Jake',
          lastName: 'Dennis'
        },
        {
          number: 36,
          name: 'Norman',
          lastName: 'Nato'
        }
      ]
    },
    {
      name: 'DS Penske',
      colorMain: '#ffd700',
      imageCar: '',
      wins: 16,
      podiums: 45,
      races: 122,
      pilots: [
        {
          number: 25,
          name: 'Jean-Eric',
          lastName: 'Vergne'
        },
        {
          number: 5,
          name: 'Stoffel',
          lastName: 'Vandoorne'
        }
      ]
    },
    {
      name: 'Envision Racing',
      colorMain: '#00ff00',
      imageCar: '',
      wins: 12,
      podiums: 33,
      races: 118,
      pilots: [
        {
          number: 37,
          name: 'Nick',
          lastName: 'Cassidy'
        },
        {
          number: 4,
          name: 'Sebastien',
          lastName: 'Buemi'
        }
      ]
    },
    {
      name: 'Jaguar TCS Racing',
      colorMain: '#000000',
      imageCar: '',
      wins: 10,
      podiums: 30,
      races: 116,
      pilots: [
        {
          number: 9,
          name: 'Mitch',
          lastName: 'Evans'
        },
        {
          number: 10,
          name: 'Sam',
          lastName: 'Bird'
        }
      ]
    },
    {
      name: 'Mahindra Racing',
      colorMain: '#ff4500',
      imageCar: '',
      wins: 5,
      podiums: 20,
      races: 100,
      pilots: [
        {
          number: 8,
          name: 'Lucas',
          lastName: 'Di Grassi'
        },
        {
          number: 7,
          name: 'Roberto',
          lastName: 'Merhi'
        }
      ]
    },
    {
      name: 'Maserati MSG Racing',
      colorMain: '#0000ff',
      imageCar: '',
      wins: 7,
      podiums: 21,
      races: 101,
      pilots: [
        {
          number: 48,
          name: 'Edoardo',
          lastName: 'Mortara'
        },
        {
          number: 5,
          name: 'Maximilian',
          lastName: 'Guenther'
        }
      ]
    },
    {
      name: 'NIO 333 Racing',
      colorMain: '#add8e6',
      imageCar: '',
      wins: 2,
      podiums: 10,
      races: 90,
      pilots: [
        {
          number: 3,
          name: 'Dan',
          lastName: 'Ticktum'
        },
        {
          number: 33,
          name: 'Sergio',
          lastName: 'Sette Camara'
        }
      ]
    },
    {
      name: 'Nissan Formula E Team',
      colorMain: '#ff1c00',
      imageCar: '',
      wins: 9,
      podiums: 28,
      races: 110,
      pilots: [
        {
          number: 23,
          name: 'Sacha',
          lastName: 'Fenestraz'
        },
        {
          number: 17,
          name: 'Norman',
          lastName: 'Nato'
        }
      ]
    },
    {
      name: 'TAG Heuer Porsche Formula E Team',
      colorMain: '#ffffff',
      imageCar: '',
      wins: 6,
      podiums: 18,
      races: 95,
      pilots: [
        {
          number: 94,
          name: 'Pascal',
          lastName: 'Wehrlein'
        },
        {
          number: 13,
          name: 'Antonio',
          lastName: 'Felix da Costa'
        }
      ]
    }
];

export default function useTeams(length){
    if(length){
        const listTeams = []
        for (let index = 0; index < length; index++) {
            const element = formulaETeams[index];
            listTeams.push(element)
        }
        return listTeams;
    }else{
        return formulaETeams
    }
}