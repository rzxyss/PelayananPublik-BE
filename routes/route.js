import  express from "express";
import { getBerita, saveBerita, editBerita, deleteBerita, getBeritaById, getBeritaLatest, likeBerita, getBeritaPopuler } from "../controllers/berita.js";
import { deleteFaq, editFaq, getFaq, saveFaq } from "../controllers/faq.js";
import { deleteProgram, editProgram, getProgram, getProgramById, saveProgram } from "../controllers/program.js";
import { deleteLaporan, getLaporan, detailLaporan, saveLaporan, getPengaduan, getAspirasi, getInformasi } from "../controllers/laporan.js";
import { getUsers, SignIn, SignOut, SignUp } from "../controllers/account.js";
import { verifyToken } from "../controllers/verifyToken.js"
import { chat } from "../controllers/chatGPT.js";
import { addAgenda, deleteAgenda, editAgenda, getAgenda, getTglAgenda } from "../controllers/agenda.js";
import { addKegiatan, deleteKegiatan, editKegiatan, getKegiatan, getKegiatanById } from "../controllers/kegiatan.js";

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

router.get('/kegiatan', getKegiatan);
router.get('/kegiatan/:id', getKegiatanById);
router.post('/kegiatan', addKegiatan);
router.patch('/kegiatan/:id', editKegiatan);
router.delete('/kegiatan/:id', deleteKegiatan);

router.get('/agenda', getAgenda);
router.post('/acara', getTglAgenda);
router.post('/agenda', addAgenda);
router.patch('/agenda/:id', editAgenda);
router.delete('/agenda/:id', deleteAgenda);
export default router;