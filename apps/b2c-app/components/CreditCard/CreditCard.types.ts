// import all bank icons
import day from '@aress-assets/icons/banks/day.svg';
import maskan from '@aress-assets/icons/banks/maskan.svg';
import ayandeh from '@aress-assets/icons/banks/ayandeh.svg';
import sepah from '@aress-assets/icons/banks/Sepah.svg';
import shahr from '@aress-assets/icons/banks/shahr.svg';
import sanatMadan from '@aress-assets/icons/banks/sanatMand.svg';
import tejarat from '@aress-assets/icons/banks/tejarat.svg';
import toseeTaavon from '@aress-assets/icons/banks/toseeTaavon.svg';
import mellliran from '@aress-assets/icons/banks/melliIran.svg';
import gharzolhasaneMehrIran from '@aress-assets/icons/banks/gharzolhasaneMehrIran.svg';
import iranzamin from '@aress-assets/icons/banks/iranzamin.svg';
import mehrEghtesad from '@aress-assets/icons/banks/mehrEghtesad.svg';
import sina from '@aress-assets/icons/banks/sina.svg';
import eghtesadNovin from '@aress-assets/icons/banks/eghtesadNovin.svg';
import gardeshgari from '@aress-assets/icons/banks/gardeshgari.svg';
import khavarmianeh from '@aress-assets/icons/banks/khavarmianeh.svg';
import parsian from '@aress-assets/icons/banks/parsian.svg';
import keshavarzi from '@aress-assets/icons/banks/keshavarzi.svg';
import hakmatIranian from '@aress-assets/icons/banks/hakmatIranian.svg';
import postBankIran from '@aress-assets/icons/banks/postBankIran.svg';
import pasargad from '@aress-assets/icons/banks/pasargad.svg';
import refah from '@aress-assets/icons/banks/refah.svg';
import saderat from '@aress-assets/icons/banks/saderat.svg';
import mellat from '@aress-assets/icons/banks/mellat.svg';
import sarmayeh from '@aress-assets/icons/banks/sarmayeh.svg';
import saman from '@aress-assets/icons/banks/saman.svg';

// central map
export const bankInfo = {
  day: { fa: 'بانک دی', icon: day },
  maskan: { fa: 'بانک مسکن', icon: maskan },
  ayandeh: { fa: 'بانک آینده', icon: ayandeh },
  Sepah: { fa: 'بانک سپه', icon: sepah },
  shahr: { fa: 'بانک شهر', icon: shahr },
  sanatMadan: { fa: 'بانک صنعت و معدن', icon: sanatMadan },
  tejarat: { fa: 'بانک تجارت', icon: tejarat },
  toseeTaavon: { fa: 'بانک توسعه تعاون', icon: toseeTaavon },
  mellliran: { fa: 'بانک ملت ایران', icon: mellliran },
  gharzolhasaneMehrIran: {
    fa: 'بانک قرض‌الحسنه مهر ایران',
    icon: gharzolhasaneMehrIran,
  },
  iranzamin: { fa: 'بانک ایران‌زمین', icon: iranzamin },
  mehrEghtesad: { fa: 'بانک مهر اقتصاد', icon: mehrEghtesad },
  sina: { fa: 'بانک سینا', icon: sina },
  eghtesadNovin: { fa: 'بانک اقتصاد نوین', icon: eghtesadNovin },
  gardeshgari: { fa: 'بانک گردشگری', icon: gardeshgari },
  khavarmianeh: { fa: 'بانک خاورمیانه', icon: khavarmianeh },
  parsian: { fa: 'بانک پارسیان', icon: parsian },
  keshavarzi: { fa: 'بانک کشاورزی', icon: keshavarzi },
  hakmatIranian: { fa: 'بانک حکمت ایرانیان', icon: hakmatIranian },
  postBankIran: { fa: 'پست بانک ایران', icon: postBankIran },
  pasargad: { fa: 'بانک پاسارگاد', icon: pasargad },
  refah: { fa: 'بانک رفاه', icon: refah },
  saderat: { fa: 'بانک صادرات', icon: saderat },
  mellat: { fa: 'بانک ملت', icon: mellat },
  sarmayeh: { fa: 'بانک سرمایه', icon: sarmayeh },
  saman: { fa: 'بانک سامان', icon: saman },
} as const;

export type BankIconName = keyof typeof bankInfo;
export type BankNameFa = (typeof bankInfo)[BankIconName]['fa'];

export interface Props {
  bankIconName: BankIconName;
  userName: string;
  shabaNumber: string[];
  accountNumber: string[];
}
