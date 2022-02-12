import af from './img/AF.png';
import ay from './img/AY.png';
import az from './img/AZ.png';
import bt from './img/BT.svg';
import kl from './img/KL.png';
import lo from './img/LO.svg';
import pc from './img/PC.png';
import sn from './img/SN.png';
import su1 from './img/SU1.png';
import tk from './img/TK.png';

export default class ImgService {
  imageBase = { 
    af, ay, az, bt, kl, lo, pc, sn, su1, tk 
  };

  getImg = (uid) => this.imageBase[uid.toLowerCase()];
};
