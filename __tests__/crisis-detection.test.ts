import { describe, it, expect } from 'vitest';
import { detectCrisis } from '../supabase/functions/_shared/safety.ts';

describe('Crisis Detection System', () => {
  describe('Self-harm Keywords Detection', () => {
    it('should detect self-harm intent - "আত্মহত্যা"', () => {
      const result = detectCrisis('আমি আত্মহত্যা করতে চাই');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('self_harm');
      expect(result.severity).toBe('critical');
    });

    it('should detect self-harm intent - "মরতে চাই"', () => {
      const result = detectCrisis('আমি মরতে চাই');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('self_harm');
      expect(result.severity).toBe('critical');
    });

    it('should detect self-harm intent - "বাঁচতে ইচ্ছা করে না"', () => {
      const result = detectCrisis('আর বাঁচতে ইচ্ছা করে না');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('self_harm');
      expect(result.severity).toBe('critical');
    });

    it('should detect pattern - "মর.*চাই"', () => {
      const result = detectCrisis('আমি মরতে চাই এই জগত থেকে');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('self_harm');
    });

    it('should detect pattern - "শেষ.*দিতে.*চাই"', () => {
      const result = detectCrisis('সব শেষ করে দিতে চাই');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('self_harm');
    });
  });

  describe('Hopelessness Detection', () => {
    it('should detect hopelessness - "সব শেষ"', () => {
      const result = detectCrisis('আমার সব শেষ');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('hopelessness');
      expect(result.severity).toBe('high');
    });

    it('should detect hopelessness - "আর কোনো আশা নেই"', () => {
      const result = detectCrisis('আমার আর কোনো আশা নেই');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('hopelessness');
    });

    it('should detect hopelessness - "উপায় নেই"', () => {
      const result = detectCrisis('কোনো উপায় নেই');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('hopelessness');
    });
  });

  describe('Severe Anxiety Detection', () => {
    it('should detect severe anxiety - "থয়ে মর"', () => {
      const result = detectCrisis('আমি ভয়ে মরে যাচ্ছি');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('severe_anxiety');
      expect(result.severity).toBe('medium');
    });

    it('should detect severe anxiety - "দম বন্ধ"', () => {
      const result = detectCrisis('আমার দম বন্ধ হয়ে যাচ্ছে');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('severe_anxiety');
    });
  });

  describe('Non-crisis Messages', () => {
    it('should NOT flag normal sadness as crisis', () => {
      const result = detectCrisis('আমি কিছুটা দুঃখিত');
      expect(result.isCrisis).toBe(false);
      expect(result.severity).toBe('low');
    });

    it('should NOT flag normal worry as crisis', () => {
      const result = detectCrisis('আমি চিন্তিত আছি');
      expect(result.isCrisis).toBe(false);
    });

    it('should NOT flag seeking support as crisis', () => {
      const result = detectCrisis('আমার কথা শোনো প্লিজ');
      expect(result.isCrisis).toBe(false);
    });

    it('should handle empty message', () => {
      const result = detectCrisis('');
      expect(result.isCrisis).toBe(false);
    });

    it('should handle whitespace-only message', () => {
      const result = detectCrisis('   ');
      expect(result.isCrisis).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle mixed Bangla and English', () => {
      const result = detectCrisis('আমি আত্মহত্যা করতে চাই I want to die');
      expect(result.isCrisis).toBe(true);
      expect(result.category).toBe('self_harm');
    });

    it('should handle case variations', () => {
      const result = detectCrisis('আমি মরতে চাই');
      expect(result.isCrisis).toBe(true);
    });

    it('should detect crisis even with typos/spaces', () => {
      const result = detectCrisis('আমি   মরতে   চাই');
      expect(result.isCrisis).toBe(true);
    });
  });
});
