export interface Esl {
    header: EslHeader;
    meter: Meter;
}

interface EslHeader {
    version: string;
    created: string;
    swSystemNameFrom: string;
    swSystemNameTo: string;
}

interface Meter {
    factoryNo: string;
    internalNo: string;
    timePeriod: TimePeriod;
}

interface TimePeriod {
    end: string;
    valueRows: ValueRow[];
}

interface ValueRow {
    obis: string;
    valueTimeStamp?: string | null;
    value: string;
    status: string;
}