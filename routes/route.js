import  express from "express";
import { getBerita, saveBerita, editBerita, deleteBerita } from "../controllers/beritaController.js";
import { deleteFaq, editFaq, getFaq, saveFaq } from "../controllers/faqController.js";
import { deleteProgram, editProgram, getProgram, saveProgram } from "../controllers/programController.js";
import { deleteLaporan, getLaporan, detailLaporan, saveLaporan, getPengaduan, getAspirasi, getInformasi } from "../controllers/laporanController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { addAccount, getUsers, Login, Logout } from "../controllers/userContoller.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get('/berita', verifyToken, getBerita);
router.post('/berita', saveBerita);
router.patch('/berita/:id', editBerita);
router.delete('/berita/:id', deleteBerita);

router.get('/program', getProgram);
router.post('/program', saveProgram);
router.patch('/program/:id', editProgram);
router.delete('/program/:id', deleteProgram);

router.get('/faq', getFaq);
router.post('/faq', saveFaq);
router.patch('/faq/:id', editFaq);
router.delete('/faq/:id', deleteFaq);

router.get('/laporan', getLaporan);
router.post('/pengaduan', verifyToken, getPengaduan);
router.post('/aspirasi', getAspirasi);
router.post('/informasi', getInformasi);
router.get('/laporan/:id', detailLaporan);
router.post('/laporan', saveLaporan);
router.delete('/laporan/:id', deleteLaporan);

router.get('/users', getUsers);
router.post('/users', addAccount);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
export default router;