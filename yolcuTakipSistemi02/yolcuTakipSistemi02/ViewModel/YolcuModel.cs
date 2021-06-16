using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace yolcuTakipSistemi02.ViewModel
{
    public class YolcuModel
    {
        public int yolcuId { get; set; }
        public string adSoyad { get; set; }
        public string bilgi { get; set; }
        public string foto { get; set; }
        public DateTime? tarih { get; set; }
        public int ucusId { get; set; }
        public string ucusAdi { get; set; }
        public int uyeId { get; set; }
        public string uyeKadi { get; set; }
    }
}