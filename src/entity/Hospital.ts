class Hospital {
    private _ID: string;

    get id(): string {
        return this._ID;
    }

    set id(value: string) {
        this._ID = value;
    }
}

export default Hospital;
