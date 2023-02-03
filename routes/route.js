import  express from "express";
import { getBerita, saveBerita, editBerita, deleteBerita, getBeritaById, getBeritaLatest, likeBerita, getBeritaPopuler } from "../controllers/beritaController.js";
import { deleteFaq, editFaq, getFaq, saveFaq } from "../controllers/faqController.js";
import { deleteProgram, editProgram, getProgram, getProgramById, saveProgram } from "../controllers/programController.js";
import { deleteLaporan, getLaporan, detailLaporan, saveLaporan, getPengaduan, getAspirasi, getInformasi } from "../controllers/laporanController.js";
import { getUsers, SignIn, SignOut, SignUp } from "../controllers/userContoller.js";
import { verifyToken } from "../controllers/verifyToken.js"
import { chat } from "../controllers/chatGTP.js";

const router = express.Router();

router.get('/berita', getBerita);
router.get('/beritaterbaru', getBeritaLatest);
router.get('/beritapopuler', getBeritaPopuler);
router.patch('/likeberita/:id', likeBerita);
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
router.post('/faq', saveFaq);
router.patch('/faq/:id', editFaq);
router.delete('/faq/:id', deleteFaq);

router.get('/laporan', getLaporan);
router.get('/pengaduan', getPengaduan);
router.get('/aspirasi', getAspirasi);
router.get('/informasi', getInformasi);
router.get('/laporan/:id', detailLaporan);
router.post('/laporan', saveLaporan);
router.delete('/laporan/:id', deleteLaporan);

router.get('/users', getUsers);
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/token', verifyToken);
router.delete ('/signout', SignOut);

router.post('/chat', chat)
export default router;