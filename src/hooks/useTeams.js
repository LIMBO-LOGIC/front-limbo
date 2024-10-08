const formulaETeams = [
    {
        name: 'ABT CUPRA Formula E Team',
        colorMain: '#194997',
        imageCar: 'cupra.png',
        wins: 14,
        podiums: 47,
        races: 115,
        pilots: [
            {
                number: 11,
                name: 'Lucas Di Grassi',
                lastName: 'Frijns'
            },
            {
                number: 51,
                name: 'Nico',
                lastName: 'Mueller'
            },
        ]
    },
    {
        name: 'Avalanche Andretti Formula E',
        colorMain: '#ED3124',
        imageCar: 'andretti.png',
        wins: 11,
        podiums: 37,
        races: 132,
        pilots: [
            {
                number: 1,
                name: 'Jake',
                lastName: 'Dennis'
            },
            {
                number: 17,
                name: 'Norman',
                lastName: 'Nato'
            }
        ]
    },
    {
        name: 'DS Penske',
        colorMain: '#CBA65F',
        imageCar: 'ds_penske.png',
        wins: 3,
        podiums: 17,
        races: 132,
        pilots: [
            {
                number: 25,
                name: 'Jean-Eric',
                lastName: 'Vergne'
            },
            {
                number: 2,
                name: 'Stoffel',
                lastName: 'Vandoorne'
            }
        ]
    },
    {
        name: 'Envision Racing',
        colorMain: '#00BE26',
        imageCar: 'envision.png',
        wins: 16,
        podiums: 53,
        races: 132,
        pilots: [
            {
                number: 4,
                name: 'Robin',
                lastName: 'Frijns'
            },
            {
                number: 16,
                name: 'Sebastien',
                lastName: 'Buemi'
            }
        ]
    },
    {
        name: 'ERT Formula E Team',
        colorMain: '#3C3C3C',
        imageCar: 'ert.png',
        wins: 2,
        podiums: 6,
        races: 132,
        pilots: [
            {
                number: 33,
                name: 'Dan',
                lastName: 'Ticktum'
            },
            {
                number: 3,
                name: 'Sérgio',
                lastName: 'Sette Cámara'
            }
        ]
    },
    {
        name: 'Jaguar TCS Racing',
        colorMain: '#000000',
        imageCar: 'jaguar.png',
        wins: 16,
        podiums: 46,
        races: 111,
        pilots: [
            {
                number: 9,
                name: 'Mitch',
                lastName: 'Evans'
            },
            {
                number: 37,
                name: 'Nick',
                lastName: 'Cassidy'
            }
        ]
    },
    {
        name: 'Mahindra Racing',
        colorMain: '#DD052B',
        imageCar: 'mahindra.png',
        wins: 5,
        podiums: 24,
        races: 131,
        pilots: [
            {
                number: 48,
                name: 'Edoardo',
                lastName: 'Mortara'
            },
            {
                number: 21,
                name: 'Nyck',
                lastName: 'De Vries'
            }
        ]
    },
    {
        name: 'Maserati MSG Racing',
        colorMain: '#001489',
        imageCar: 'maserati.png',
        wins: 10,
        podiums: 27,
        races: 132,
        pilots: [
            {
                number: 18,
                name: 'Jehan',
                lastName: 'Daruvala'
            },
            {
                number: 7,
                name: 'Maximilian',
                lastName: 'Guenther'
            }
        ]
    },
    {
        name: 'Neom McLaren Formula E Team',
        colorMain: ' #FF8000',
        imageCar: 'mclaren.png',
        wins: 8,
        podiums: 26,
        races: 87,
        pilots: [
            {
                number: 5,
                name: 'Jake',
                lastName: 'Hughes'
            },
            {
                number: 8,
                name: 'Sam',
                lastName: 'Bird'
            },
        ]
    },
    {
        name: 'Nissan Formula E Team',
        colorMain: '#C3002F',
        imageCar: 'nissan.png',
        wins: 19,
        podiums: 47,
        races: 132,
        pilots: [
            {
                number: 22,
                name: 'Oliver',
                lastName: 'Rowland'
            },
            {
                number: 23,
                name: 'Sacha',
                lastName: 'Fenestraz'
            }
        ]
    },
    {
        name: 'TAG Heuer Porsche Formula E Team',
        colorMain: '#D5001C',
        imageCar: 'porsche.png',
        wins: 12,
        podiums: 22,
        races: 74,
        pilots: [
            {
                number: 94,
                name: 'Pascal',
                lastName: 'Wehrlein'
            },
            {
                number: 13,
                name: 'Antonio Felix',
                lastName: 'Da Costa'
            }
        ]
    }
];

export default function useTeams(length) {
    if (length) {
        const listTeams = []
        for (let index = 0; index < length; index++) {
            const element = formulaETeams[index];
            listTeams.push(element)
        }
        return listTeams;
    } else {
        return formulaETeams
    }
}