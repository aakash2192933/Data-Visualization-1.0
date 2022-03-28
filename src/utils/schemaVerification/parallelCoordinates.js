import Papa from "papaparse";
import moment from 'moment';
import { ParallelCoordinatesSchema } from '../../modal/parallelCoordinates';

export const parallelCoordinatesValidation = (file, callback) => {
    try {
        if (file.type === 'application/json') {
            const onReaderLoad = (e) => {
                const data = JSON.parse(e.target.result);
                const validation = ParallelCoordinatesSchema.validate(data);
                if (validation.error) {
                    callback(null, validation.error);
                } else {
                    callback(validation.value);
                }
            }
            
            var reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(file);
        } else if (file.type === "application/vnd.ms-excel") {
            Papa.parse(file, {
                complete: ({ data }) => {
                    // Parse Result - from array of arrays -> array of objects
                    data.pop();
                    let dateError = false;
                    const parsedData = data.map((dt) => {
                        const date = [ ...dt ].pop();
                        if (!moment(date, "MM-DD-YYYY").isValid()) {
                            dateError = true;
                        } 

                        return ({ 
                            ...Object.assign({}, dt.slice(0, dt.length - 1)),  
                            date: dt.pop(),
                        })
                    });

                    const validation = ParallelCoordinatesSchema.validate(parsedData);

                    if (validation.error) {
                        callback(null, validation.error);
                    } else if (dateError) {
                        callback(null, 'Invalid date format.');
                    } else {
                        callback(validation.value);
                    }
                }
            })
        } else {
            callback(null, "Invalid File Format")
        }
    } catch (e) {
        callback(null, e.message);
    }
}
