import  express from "express";
import { getBerita, saveBerita, editBerita, deleteBerita } from "../controllers/beritaController.js";
import { deleteFaq, editFaq, getFaq, getFaqById, saveFaq } from "../controllers/faqController.js";
import { deleteProgram, editProgram, getProgram, saveProgram } from "../controllers/programController.js";
import { deleteLaporan, getLaporan, detailLaporan, saveLaporan, getPengaduan, getAspirasi, getInformasi } from "../controllers/laporanController.js";
import { addAdmin, checkToken, deleteAdmin, loginAdmin, logoutAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.get('/berita', getBerita);
router.post('/berita', saveBerita);
router.patch('/berita/:id', editBerita);
router.delete('/berita/:id', deleteBerita);

router.get('/program', getProgram);
router.post('/program', saveProgram);
router.patch('/program/:id', editProgram);
router.delete('/program/:id', deleteProgram);

router.get('/faq', getFaq);
router.get('/faq/:id', getFaqById);
router.post('/faq', saveFaq);
router.patch('/faq/:id', editFaq);
router.delete('/faq/:id', deleteFaq);

router.get('/laporan', getLaporan);
router.post('/pengaduan', getPengaduan);
router.post('/aspirasi', getAspirasi);
router.post('/informasi', getInformasi);
router.get('/laporan/:id', detailLaporan);
router.post('/laporan', saveLaporan);
router.delete('/laporan/:id', deleteLaporan);

router.post('/check', checkToken);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.post('/admin', addAdmin);
router.delete('/admin/:id', deleteAdmin);
export default router;