
import { toast } from 'sonner';

export const shareContent = async (content: string, title: string, url?: string) => {
  // Check if native sharing is available
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: content,
        url: url || window.location.href,
      });
      return true;
    } catch (error) {
      // User cancelled sharing or other error
      console.log('Share cancelled:', error);
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!');
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    toast.error('Failed to share content');
    return false;
  }
};

export const shareToSocial = (platform: string, content: string, url?: string) => {
  const shareUrl = url || window.location.href;
  const encodedContent = encodeURIComponent(content);
  const encodedUrl = encodeURIComponent(shareUrl);
  
  let socialUrl = '';
  
  switch (platform) {
    case 'twitter':
      socialUrl = `https://twitter.com/intent/tweet?text=${encodedContent}&url=${encodedUrl}`;
      break;
    case 'facebook':
      socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedContent}`;
      break;
    case 'whatsapp':
      socialUrl = `https://wa.me/?text=${encodedContent}%20${encodedUrl}`;
      break;
    case 'telegram':
      socialUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedContent}`;
      break;
    default:
      return false;
  }
  
  window.open(socialUrl, '_blank', 'width=600,height=400');
  return true;
};
