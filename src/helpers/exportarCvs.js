import * as XLSX from 'xlsx'

export const exportarCvs = (fileName, data) => {

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
        bookType: 'xlsx'
    };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    link.click();

}
