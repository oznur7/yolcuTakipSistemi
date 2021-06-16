using yolcuTakipSistemi02.Models;
using yolcuTakipSistemi02.ViewModel;
using System.Linq;

namespace yolcuTakipSistemi02.Auth
{
    public class UyeService
    {
        DB_ytsEntities db = new DB_ytsEntities();

        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.kullaniciAdi == kadi && s.sifre == parola).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdSoyad = x.uyeAdSoyad,
                email = x.email,
                kullaniciAdi = x.kullaniciAdi,
                foto = x.foto,
                sifre = x.sifre,
                uyeAdmin = x.uyeAdmin
            }).SingleOrDefault();
            return uye;

        }
    }
}