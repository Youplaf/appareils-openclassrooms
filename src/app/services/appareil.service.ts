import { Subject } from "rxjs";

export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils: any [] = [ 
        {
            id: 1,
            name: 'Machine à laver',
            status: 'éteint'
        },
        {
            id: 2,
            name: 'Télévision',
            status: 'allumé'
        },
        {
            id: 3,
            name: 'Ordinateur',
            status: 'éteint'
        },
    ];

    // émet une copie du tableau appareils
    emitAppareilSubject() {
        this.appareilSubject.next(this.appareils.slice());
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(appareil => appareil.id === id);
        return appareil;
    }

    switchOnAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }

    switchOffAll() {
        for(let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status= 'allumé';
        this.emitAppareilSubject();
    }

    switchOffOne(index: number) {
        this.appareils[index].status= 'éteint';
        this.emitAppareilSubject();
    }

    addAppareil(name: string, status: string) {
        const appareil = {
            id: 0,
            name: '',
            status: ''
        };

        appareil.name = name;
        appareil.status = status;
        appareil.id = this.appareils[this.appareils.length - 1].id + 1;
        
        this.appareils.push(appareil);
        this.emitAppareilSubject();
    }
}