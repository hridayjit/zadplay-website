// Verification script for GSAP installation
import gsap from 'gsap';
import ScrollTriggerPkg from 'gsap/ScrollTrigger.js';
const { ScrollTrigger } = ScrollTriggerPkg;

console.log('✓ GSAP imported successfully:', typeof gsap);
console.log('✓ ScrollTrigger imported successfully:', typeof ScrollTrigger);
console.log('✓ GSAP version:', gsap.version);

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
console.log('✓ ScrollTrigger registered successfully');

console.log('\n✅ All GSAP dependencies are properly installed and available!');
