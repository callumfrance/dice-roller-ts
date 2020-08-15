export interface Observable {
    attach(observer: Observer): void;

    detach(observer: Observer): void;

    notify(): void;
}

export interface Observer {
    update(observable: Observable): void;
}
