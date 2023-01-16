import  express from "express";
import { getBerita, getBeritaById, saveBerita, editBerita, deleteBerita } from "../controllers/beritaController.js";
import { deleteFaq, editFaq, getFaq, getFaqById, saveFaq } from "../controllers/faqController.js";
import { deleteProgram, editProgram, getProgram, getProgramById, saveProgram } from "../controllers/programController.js";
import { deletePengaduan, editPengaduan, getPengaduan, getPengaduanById, savePengaduan } from "../controllers/pengaduanController.js";
import { deleteKomentar, editKomentar, getKomentar, getKomentarById, saveKomentar } from "../controllers/komentarController.js";
import { addAdmin, deleteAdmin, getAdmin, getAllAdmin, getToken } from "../controllers/adminController.js";

const router = express.Router();

router.get('/berita', getBerita);
router.get('/berita/:id', getBeritaById);
router.post('/berita', saveBerita);
router.patch('/berita/:id', editBerita);
router.delete('/berita/:id', deleteBerita);

router.get('/program', getProgram);
router.get('/program/:id', getProgramById);
router.post('/program', saveProgram);
router.patch('/program/:id', editProgram);
router.delete('/program/:id', deleteProgram);

router.get('/faq', getFaq);
router.get('/faq/:id', getFaqById);
router.post('/faq', saveFaq);
router.patch('/faq/:id', editFaq);
router.delete('/faq/:id', deleteFaq);

router.get('/pengaduan', getPengaduan);
router.get('/pengaduan/:id', getPengaduanById);
router.post('/pengaduan', savePengaduan);
router.patch('/pengaduan/:id', editPengaduan);
router.delete('/pengaduan/:id', deletePengaduan);

router.get('/komentar', getKomentar);
router.get('/komentar/:id', getKomentarById);
router.post('/komentar', saveKomentar);
router.patch('/komentar/:id', editKomentar);
router.delete('/komentar/:id', deleteKomentar);


router.get('/admin', getAllAdmin);
router.post('/token', getToken);
router.post('/login', getAdmin);
router.post('/admin', addAdmin);
router.delete('/admin/:id', deleteAdmin);
export default router;