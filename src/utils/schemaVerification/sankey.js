import Papa from "papaparse";
import { SankeySchema } from '../../modal/sankey';

export const sankeyValidation = (file, callback) => {
    try {
        if (file.type === 'application/json') {
            const onReaderLoad = (e) => {
                const data = JSON.parse(e.target.result);
                const validation = SankeySchema.validate(data);
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
                    const parsedData = data.map((dt) => ({
                        source: dt[0],
                        target: dt[1],
                        value: parseInt(dt[2]),
                        date: dt[3],
                    }));

                    const validation = SankeySchema.validate(parsedData);
                    
                    if (validation.error) {
                        callback(null, validation.error);
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
