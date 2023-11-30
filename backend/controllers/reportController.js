import { Reports } from '../models/reports.js';


const createReport = async (request, response) => {
    try {
        if (!request.body.name) {
            return response.status(400).send({ message: 'A name must be Entered' });
        }

        const newRep = {
            name: request.body.name,
            description: request.body.description,
            date: request.body.date,
            params: {
                startDate: request.body.params.startDate,
                endDate: request.body.params.endDate,
                busName: request.body.params.busName,
                customer: request.body.params.customer,
                paymentType: request.body.params.paymentType,
                status: request.body.params.status,
                service: request.body.params.service,
                employee: request.body.params.employee
            },
            info: request.body.info.map((elem) => ({

                workOrder: {
                    title: elem.workOrder.title,
                    startDate: elem.workOrder.startDate,
                    endDate: elem.workOrder.endDate,
                    description: elem.workOrder.description,
                    cost: elem.workOrder.cost,
                    busName: elem.workOrder.busName
                },
                employee: {
                    name: elem.employee.name,

                },
                customer: {
                    name: elem.customer.name,
                    phone: elem.customer.phone,
                    email: elem.customer.email
                }
            }))
        }
        console.log(newRep.info[0])

        const result = await Reports.create(newRep);
        return response.status(201).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
}

const getReports = async (request, response) => {
    try {
        const result = await Reports.find({}, "_id name date description");
        return response.status(200).send({
            count: result.length,
            data: result
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    };
}

const getReportById = async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Reports.findById(id);
        if (!result) {
            return response.status(404).send({ message: 'Report Not Found' });
        };
        return response.status(200).send(result);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    };
}

const deleteReport = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Reports.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Report Not Found' });
        };
        return response.status(200).send({ message: "Report Deleted!" });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    };
}

export default { createReport, getReports, getReportById, deleteReport };