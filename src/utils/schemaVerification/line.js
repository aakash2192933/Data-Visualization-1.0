import Papa from "papaparse";
import { LineSchema } from '../../modal/line';

export const lineValidation = (file, callback) => {
    try {
        if (file.type === 'application/json') {
            const onReaderLoad = (e) => {
                const data = JSON.parse(e.target.result);
                const validation = LineSchema.validate(data);
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
                        id: dt[0],
                        x: dt[1],
                        y: parseInt(dt[2]),
                        date: dt[3],
                    }));

                    const validation = LineSchema.validate(parsedData);
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
