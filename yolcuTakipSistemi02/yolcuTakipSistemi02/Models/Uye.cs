//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace yolcuTakipSistemi02.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Uye
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Uye()
        {
            this.Yolcu = new HashSet<Yolcu>();
        }
    
        public int uyeId { get; set; }
        public string kullaniciAdi { get; set; }
        public string email { get; set; }
        public string sifre { get; set; }
        public string uyeAdSoyad { get; set; }
        public string foto { get; set; }
        public int uyeAdmin { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Yolcu> Yolcu { get; set; }
    }
}