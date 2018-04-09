import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils: any [] = [];

    constructor(
        private httpClient: HttpClient
    ) {}

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
        this.appareils.length ? appareil.id = this.appareils[this.appareils.length - 1].id + 1 : appareil.id = 1;
        
        this.appareils.push(appareil);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
        .put("https://http-client-demo-44c3a.firebaseio.com/appareils.json", this.appareils)
        .subscribe(
            () => {
                console.log('Enregistrement terminé !');
            },
            (error) => {
                console.log('Erreur de sauvegarde ! ' + error);
            }
        )
    }

    getAppareilsFromServer() {
        this.httpClient
            .get<any[]>("https://http-client-demo-44c3a.firebaseio.com/appareils.json")
            .subscribe(
                (response) => {
                    this.appareils = response;
                    this.emitAppareilSubject();
                },
                (error) => {
                    console.log('Erreur de chargement ! ' + error);
                }
            );
    }
}