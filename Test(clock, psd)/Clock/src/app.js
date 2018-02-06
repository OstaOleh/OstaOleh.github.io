const Clock = (function () {
    const app = document.getElementById('app');

    let date = new Date();
    const sec = date.getSeconds();
    const min = date.getMinutes();
    const hours = date.getHours();

    const createClock = function () {
        const clock = document.createElement('div')
        clock.className = 'clock'
        app.appendChild(clock)
    }
    const createArrows = function (...clockItems) {
        clockItems.forEach(item => {
            const div = document.createElement('div')
            div.className = item;
            const parent = document.querySelector('.clock');
            parent.appendChild(div)
        })

    }

    const runTime = function () {
        const deg = 6;
        const hourDeg = 30;
        
        document.querySelector('.sec').style.transform = `rotate(${deg*date.getSeconds()}deg`;

        document.querySelector('.min').style.transform = `rotate(${deg*date.getMinutes()}deg`;

        document.querySelector('.hours').style.transform = `rotate(${hourDeg*date.getHours()}deg`;

        date = new Date();
    }

    
    return {
        init: function () {
            createClock();
            createArrows('sec', 'min', 'hours', 'dot')
            setInterval(runTime, 1000)
            console.log(sec)
            console.log(min)
            console.log(hours)
        }
    }
})();

Clock.init();