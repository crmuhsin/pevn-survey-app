import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
    print(quality = 1, filename, selector) {
        html2canvas(document.querySelector('#'+selector),
            { scale: quality }
        ).then(canvas => {
            let pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 20, 30);
            pdf.save(filename+'.pdf');
        });
    },
    maker(docDefinition){
        pdfMake.createPdf(docDefinition).open();
    }
}