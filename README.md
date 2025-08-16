# 💕 Michelle's Love Journey Website 💕

A beautiful, interactive love story website created for Michelle Diana Huertas by Bryan Alexander Diaz for their 10-month anniversary.

## 🌟 Features

- **6 Interactive Screens**: A journey through your love story
- **Beautiful Animations**: Floating hearts, sparkles, and smooth transitions
- **Mobile Optimized**: Perfect experience on phones
- **Touch Gestures**: Swipe through photos on mobile
- **Interactive Quiz**: Fun questions about your relationship
- **Photo Gallery**: Showcase your beautiful memories
- **Future Dreams**: Interactive cards about your future together
- **Final Declaration**: Your heartfelt promises with stunning animations

## 📱 How to Use

1. Open `index.html` in a web browser
2. The website works best on mobile phones (Michelle's experience)
3. Navigate through screens using the buttons or keyboard arrows
4. Swipe left/right on the photo gallery
5. Tap on dream cards to reveal details
6. Use the music button to control background music (when added)

## 🖼️ Adding Your Photos

To replace the placeholder photos with your actual photos:

1. Create a folder called `images` in the same directory as the HTML files
2. Add your photos with these names:
   - `photo1.jpg` - Your first photo together
   - `photo2.jpg` - A special moment
   - `photo3.jpg` - The proposal
   - `photo4.jpg` - Happy together

3. Update the HTML in `index.html` around lines 85-110:

Replace this:
```html
<div class="photo-placeholder">
    <i class="fas fa-camera"></i>
    <p>Your First Photo Together</p>
</div>
```

With this:
```html
<img src="images/photo1.jpg" alt="Your First Photo Together" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
```

Do this for all 4 photos, updating the src and alt attributes accordingly.

## 🎵 Adding Background Music

To add romantic background music:

1. Add an audio file (e.g., `music.mp3`) to your folder
2. Add this HTML before the closing `</body>` tag:
```html
<audio id="background-music" loop>
    <source src="music.mp3" type="audio/mpeg">
</audio>
```

3. Update the `toggleMusic()` function in `script.js`:
```javascript
function toggleMusic() {
    const button = document.getElementById('music-toggle');
    const icon = button.querySelector('i');
    const audio = document.getElementById('background-music');
    
    if (icon.classList.contains('fa-music')) {
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
        audio.play();
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
        audio.pause();
    }
}
```

## 🎨 Customization Options

### Colors
The website uses a beautiful gradient color scheme. To change colors, update the CSS variables in `styles.css`:

- Main gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Accent colors: `#ff6b6b`, `#feca57`, `#48dbfb`, `#ff9ff3`

### Text Content
All text can be customized in `index.html`:
- Timeline events (lines 45-65)
- Quiz questions (lines 75-95)
- Photo captions (lines 105-125)
- Dream descriptions (lines 140-170)
- Final promises (lines 185-205)

### Timeline Events
Update the timeline in the Anniversary screen to reflect your actual relationship milestones.

## 🚀 Hosting the Website

### Option 1: Simple File Sharing
1. Zip all the files together
2. Send to Michelle to open `index.html` in her browser

### Option 2: Free Web Hosting
1. Upload files to GitHub Pages, Netlify, or Vercel
2. Share the live URL with Michelle

### Option 3: QR Code
1. Host the website online
2. Create a QR code linking to it
3. Michelle can scan to access instantly

## 💡 Pro Tips

1. **Test on Mobile**: Make sure to test the website on a phone before sharing
2. **Photo Quality**: Use high-quality photos for the best experience
3. **Personal Touch**: Customize the timeline and quiz with your actual memories
4. **Music Choice**: Choose a song that's meaningful to both of you
5. **Surprise Element**: Don't tell Michelle what to expect - let it be a surprise!

## 🛠️ Technical Details

- **HTML5**: Semantic structure with accessibility in mind
- **CSS3**: Modern animations and responsive design
- **Vanilla JavaScript**: No dependencies, fast loading
- **Mobile-First**: Optimized for phone viewing
- **Touch Gestures**: Native swipe support
- **Keyboard Navigation**: Arrow keys and spacebar support

## 💖 The Journey

1. **Welcome Screen**: Beautiful entrance with Michelle's name
2. **Anniversary Screen**: Animated timeline of your relationship
3. **Love Quiz**: Interactive questions about your relationship
4. **Photo Gallery**: Swipeable photo carousel of your memories
5. **Future Dreams**: Interactive cards about your future together
6. **Final Declaration**: Your heartfelt promises with stunning animations

## 🎁 Special Features

- **Floating Hearts**: Romantic animated elements throughout
- **Sparkle Effects**: Magical touches on interactions
- **Smooth Transitions**: Cinematic screen changes
- **Progress Tracking**: Visual feedback on quiz progress
- **Responsive Design**: Perfect on any device
- **Touch Optimized**: Natural mobile interactions

---

**Created with love by Bryan Alexander Diaz for Michelle Diana Huertas** ❤️

*"I will always love you, I will always protect you, and I look forward to our marriage in two months."*
# michelle-10-months
