import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Die } from './Die';
import { DiceGroup } from './DiceGroup';
import { DiceSet } from './DiceSet';
import { Observer, Observable } from './obsInterfaces';

class RollObserver implements Observer {
    private sv: HTMLElement;
    private app: HTMLElement;

    public constructor(app: HTMLElement,
        setView: HTMLElement) {
        this.sv = setView;
        this.app = app;
    }

    public update(oble: Observable): void {
        if (oble instanceof DiceSet) {
            console.log('Observer reacted to the event');
            this.sv = oble.getHTML();
            this.sv.setAttribute('id', 'D1');
            let x = document.getElementById('D1');
            document.getElementById('app').replaceChild(this.sv, x);
        }
    }
}

let app: HTMLElement = document.getElementById('app');
let q: DiceSet = new DiceSet().diceSet1();
let qView: HTMLElement = q.getHTML();
qView.setAttribute('id', 'D1');
let ro: RollObserver = new RollObserver(app, qView);

q.attach(ro);

app.appendChild(qView);

qView = document.createElement('div');
qView.setAttribute('class', 'aaaaa');
qView.innerText = 'wow';
