export class Event{
	_id: string;
    receiveDate: string;
    receiptDate: string;
    patient: {
    	drugs: any;
    	reaction: any;
    	age: string;
    	sex: string;
    }
    safetyReportId: string;
    companyNumber: string;
}