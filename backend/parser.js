import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extracts plain text from an uploaded resume file (PDF or DOCX).
 * @param {Express.Multer.File} file - file object from multer (memoryStorage)
 * @returns {Promise<string>} extracted text
 */
export async function extractText(file) {
  const mime = file.mimetype;
  const buffer = file.buffer;

  if (mime === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error('Unsupported file type. Please upload a PDF or DOCX resume.');
}
