export interface Sdat {
  headerInformation: HeaderInformation | null;
  meteringData: MeteringData | null;
}

interface HeaderInformation {
  headerVersion: string | null;
  sender: Party | null;
  receiver: Party | null;
  instanceDocument: InstanceDocument | null;
  businessScopeProcess: BusinessScopeProcess | null;
}

interface Party {
  id: EicIDWrapper | null;
  role: string | null;
}

interface EicIDWrapper {
  eicid: string | null;
}

interface InstanceDocument {
  dictionaryAgencyID: string | null;
  versionID: string | null;
  documentID: string | null;
  documentType: DocumentType | null;
  creation: string | null;
  status: string | null;
}

interface DocumentType {
  ebixCode: string | null;
}

interface BusinessScopeProcess {
  businessReasonType: BusinessReasonType | null;
  businessDomainType: string | null;
  businessSectorType: string | null;
  reportPeriod: ReportPeriod | null;
}

interface BusinessReasonType {
  ebixCode: string | null;
}

interface ReportPeriod {
  startDateTime: string | null;
  endDateTime: string | null;
}

interface MeteringData {
  documentID: string | null;
  interval: Interval | null;
  resolution: Resolution | null;
  meteringPoint: MeteringPoint | null;
  product: Product | null;
  observations: Observation[] | null;
}

interface Interval {
  startDateTime: string | null;
  endDateTime: string | null;
}

interface Resolution {
  resolution: string | null;
  unit: string | null;
}

interface MeteringPoint {
  vseId: string | null;
}

interface Product {
  id: string | null;
  unit: string | null;
}

interface Observation {
  position: Position | null;
  volume: number | null;
}

interface Position {
  sequence: number | null;
}
