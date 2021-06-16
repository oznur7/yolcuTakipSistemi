using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using yolcuTakipSistemi02.Models;
using yolcuTakipSistemi02.ViewModel;

namespace yolcuTakipSistemi02.Controllers
{
    [Authorize]
    public class ServisController : ApiController
    {
        DB_ytsEntities db = new DB_ytsEntities();
        SonucModel sonuc = new SonucModel();

        #region Ucus
        [HttpGet]
        [Route("api/ucusliste")]
        public List<UcusModel> UcusListe()
        {
            List<UcusModel> liste = db.Ucus.Select(x => new UcusModel()
            {

                ucusId = x.ucusId,
                ucusAdi = x.ucusAdi,
                ucYolcuSay = x.Yolcu.Count

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ucusbyid/{ucId}")]
        public UcusModel UcusById(int ucId)
        {
            UcusModel kayit = db.Ucus.Where(s => s.ucusId == ucId).Select(x => new UcusModel()
            {

                ucusId = x.ucusId,
                ucusAdi = x.ucusAdi,
                ucYolcuSay = x.Yolcu.Count

            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/ucusekle")]
        public SonucModel UcusEkle(UcusModel model)
        {
            if (db.Ucus.Count(s => s.ucusAdi == model.ucusAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen uçuş adı kayıtlıdır.";
                return sonuc;
            }

            Ucus yeni = new Ucus();
            yeni.ucusAdi = model.ucusAdi;
            db.Ucus.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ucus eklendi.";

            return sonuc;
        }

        [HttpPut]
        [Route("api/ucusduzenle")]
        public SonucModel UcusDuzenle(UcusModel model)
        {
            Ucus kayit = db.Ucus.Where(s => s.ucusId == model.ucusId).FirstOrDefault();

            if(kayit==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }
            kayit.ucusAdi = model.ucusAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ucuş düzenlendi.";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/ucussil/{ucId}")]
        public SonucModel UcusSil(int ucId)
        {
            Ucus kayit = db.Ucus.Where(s => s.ucusId == ucId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }

            if (db.Yolcu.Count(s=>s.ucusId==ucId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde yolcu kayıtlı uçuş silinemez!";
                return sonuc;
            }

            db.Ucus.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Uçuş silindi.";


            return sonuc;
        }

        #endregion

        #region Yolcu

        [HttpGet]
        [Route("api/yolculiste")]
        public List<YolcuModel> YolcuListe()
        {
            List<YolcuModel> liste = db.Yolcu.Select(x => new YolcuModel()
            {
                yolcuId = x.yolcuId,
                adSoyad = x.adSoyad,
                bilgi = x.bilgi,
                foto = x.foto,
                ucusId = x.ucusId,
                ucusAdi = x.Ucus.ucusAdi,
                tarih = x.tarih,
                uyeId = x.uyeId,
                uyeKadi = x.Uye.kullaniciAdi

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/yolculistebyucusid/{ucId}")]
        public List<YolcuModel> YolcuListeByUcusId(int ucId)
        {
            List<YolcuModel> liste = db.Yolcu.Where(s => s.ucusId == ucId).Select(x => new YolcuModel()
            {
                yolcuId = x.yolcuId,
                adSoyad = x.adSoyad,
                bilgi = x.bilgi,
                foto = x.foto,
                ucusId = x.ucusId,
                ucusAdi = x.Ucus.ucusAdi,
                tarih = x.tarih,
                uyeId = x.uyeId,
                uyeKadi = x.Uye.kullaniciAdi

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/yolculistebyuyeid/{uyeId}")]
        public List<YolcuModel> YolcuListeByUyeId(int uyeId)
        {
            List<YolcuModel> liste = db.Yolcu.Where(s => s.uyeId == uyeId).Select(x => new YolcuModel()
            {
                yolcuId = x.yolcuId,
                adSoyad = x.adSoyad,
                bilgi = x.bilgi,
                foto = x.foto,
                ucusId = x.ucusId,
                ucusAdi = x.Ucus.ucusAdi,
                tarih = x.tarih,
                uyeId = x.uyeId,
                uyeKadi = x.Uye.kullaniciAdi

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/yolcubyid/{yolcuId}")]
        public YolcuModel YolcuById(int yolcuId)
        {
            YolcuModel kayit = db.Yolcu.Where(s => s.yolcuId == yolcuId).Select(x => new YolcuModel()
            {
                yolcuId = x.yolcuId,
                adSoyad = x.adSoyad,
                bilgi = x.bilgi,
                foto = x.foto,
                ucusId = x.ucusId,
                ucusAdi = x.Ucus.ucusAdi,
                tarih = x.tarih,
                uyeId = x.uyeId,
                uyeKadi = x.Uye.kullaniciAdi

            }).SingleOrDefault();
            return kayit;
        }
        
        [HttpPost]
        [Route("api/yolcuekle")]
        public SonucModel YolcuEkle(YolcuModel model)
        {
            if (db.Yolcu.Count(s => s.adSoyad == model.adSoyad) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen yolcu ismi kayıtlıdır!";
                return sonuc;
            }

            Yolcu yeni = new Yolcu();
            yeni.adSoyad = model.adSoyad;
            yeni.bilgi = model.bilgi;
            yeni.tarih = model.tarih;
            yeni.ucusId = model.ucusId;
            yeni.uyeId = model.uyeId;
            yeni.foto = model.foto;
            db.Yolcu.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yolcu bilgileri kaydedilmiştir.";

            return sonuc;
        }

        [HttpPut]
        [Route("api/yolcuduzenle")]
        public SonucModel YolcuDuzenle(YolcuModel model)
        {
            Yolcu kayit = db.Yolcu.Where(s => s.yolcuId == model.yolcuId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }

            kayit.adSoyad = model.adSoyad;
            kayit.bilgi = model.bilgi;
            kayit.tarih = model.tarih;
            kayit.ucusId = model.ucusId;
            kayit.uyeId = model.uyeId;
            kayit.foto = model.foto;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yolcu bilgileri güncellenmiştir.";

            return sonuc;

        }

        [HttpDelete]
        [Route("api/yolcusil/{yolcuId}")]
         public SonucModel YolcuSil(int yolcuId)
        {
            Yolcu kayit = db.Yolcu.Where(s => s.yolcuId == yolcuId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.";
                return sonuc;
            }

            db.Yolcu.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yolcu bilgileri silinmiştir.";

            return sonuc;
        }

        #endregion

        #region Üye

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdSoyad = x.uyeAdSoyad,
                email = x.email,
                kullaniciAdi = x.kullaniciAdi,
                foto = x.foto,
                sifre = x.sifre,
                uyeAdmin = x.uyeAdmin

            }).ToList();

            return liste;
        }


        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById (int uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.uyeId == uyeId).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdSoyad = x.uyeAdSoyad,
                email = x.email,
                kullaniciAdi = x.kullaniciAdi,
                foto = x.foto,
                sifre = x.sifre,
                uyeAdmin = x.uyeAdmin

            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.kullaniciAdi == model.kullaniciAdi || s.email == model.email) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen kullanıcı adı/eposta adresi kayıtlıdır!";
                return sonuc;
            }

            Uye yeni = new Uye();
            yeni.uyeAdSoyad = model.uyeAdSoyad;
            yeni.email = model.email;
            yeni.kullaniciAdi = model.kullaniciAdi;
            yeni.foto = model.foto;
            yeni.sifre = model.sifre;
            yeni.uyeAdmin = model.uyeAdmin;

            db.Uye.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yeni üye kaydedilmiştir.";

            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == model.uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı!";
                return sonuc;
            }

            kayit.uyeAdSoyad = model.uyeAdSoyad;
            kayit.email = model.email;
            kayit.kullaniciAdi = model.kullaniciAdi;
            kayit.foto = model.foto;
            kayit.sifre = model.sifre;
            kayit.uyeAdmin = model.uyeAdmin;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye bilgileri güncellenmiştir.";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı!";
                return sonuc;
            }

            if (db.Yolcu.Count(s => s.uyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde uçuş kaydı bulunan üye silinemez!";
                return sonuc;
            }

            db.Uye.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye silinmiştir.";

            return sonuc;
        }
        #endregion
    }
}
