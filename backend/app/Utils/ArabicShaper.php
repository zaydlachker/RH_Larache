<?php

namespace App\Utils;

class ArabicShaper
{
    private static $map = [
        0x0621 => [0xFE80, 0xFE80, 0xFE80, 0xFE80], // Hamza
        0x0622 => [0xFE81, 0xFE81, 0xFE82, 0xFE82], // Alef with Madda
        0x0623 => [0xFE83, 0xFE83, 0xFE84, 0xFE84], // Alef with Hamza Above
        0x0624 => [0xFE85, 0xFE85, 0xFE86, 0xFE86], // Waw with Hamza Above
        0x0625 => [0xFE87, 0xFE87, 0xFE88, 0xFE88], // Alef with Hamza Below
        0x0626 => [0xFE89, 0xFE8B, 0xFE8C, 0xFE8A], // Yeh with Hamza Above
        0x0627 => [0xFE8D, 0xFE8D, 0xFE8E, 0xFE8E], // Alef
        0x0628 => [0xFE8F, 0xFE91, 0xFE92, 0xFE90], // Beh
        0x0629 => [0xFE93, 0xFE93, 0xFE94, 0xFE94], // Teh Marbuta
        0x062A => [0xFE95, 0xFE97, 0xFE98, 0xFE96], // Teh
        0x062B => [0xFE99, 0xFE9B, 0xFE9C, 0xFE9A], // Theh
        0x062C => [0xFE9D, 0xFE9F, 0xFEA0, 0xFE9E], // Jeem
        0x062D => [0xFEA1, 0xFEA3, 0xFEA4, 0xFEA2], // Hah
        0x062E => [0xFEA5, 0xFEA7, 0xFEA8, 0xFEA6], // Khah
        0x062F => [0xFEA9, 0xFEA9, 0xFEAA, 0xFEAA], // Dal
        0x0630 => [0xFEAB, 0xFEAB, 0xFEAC, 0xFEAC], // Thal
        0x0631 => [0xFEAD, 0xFEAD, 0xFEAE, 0xFEAE], // Reh
        0x0632 => [0xFEAF, 0xFEAF, 0xFEB0, 0xFEB0], // Zain
        0x0633 => [0xFEB1, 0xFEB3, 0xFEB4, 0xFEB2], // Seen
        0x0634 => [0xFEB5, 0xFEB7, 0xFEB8, 0xFEB6], // Sheen
        0x0635 => [0xFEB9, 0xFEBB, 0xFEBC, 0xFEBA], // Sad
        0x0636 => [0xFEBD, 0xFEBF, 0xFEC0, 0xFEBE], // Dad
        0x0637 => [0xFEC1, 0xFEC3, 0xFEC4, 0xFEC2], // Tah
        0x0638 => [0xFEC5, 0xFEC7, 0xFEC8, 0xFEC6], // Zah
        0x0639 => [0xFEC9, 0xFECB, 0xFECC, 0xFECA], // Ain
        0x063A => [0xFECD, 0xFECF, 0xFED0, 0xFECE], // Ghain
        0x0641 => [0xFED1, 0xFED3, 0xFED4, 0xFED2], // Feh
        0x0642 => [0xFED5, 0xFED7, 0xFED8, 0xFED6], // Qaf
        0x0643 => [0xFED9, 0xFEDB, 0xFEDC, 0xFEDA], // Kaf
        0x0644 => [0xFEDD, 0xFEDF, 0xFEE0, 0xFEDE], // Lam
        0x0645 => [0xFEE1, 0xFEE3, 0xFEE4, 0xFEE2], // Meem
        0x0646 => [0xFEE5, 0xFEE7, 0xFEE8, 0xFEE6], // Noon
        0x0647 => [0xFEE9, 0xFEEB, 0xFEEC, 0xFEEA], // Heh
        0x0648 => [0xFEED, 0xFEED, 0xFEEE, 0xFEEE], // Waw
        0x0649 => [0xFEEF, 0xFEEF, 0xFEF0, 0xFEF0], // Alef Maksura
        0x064A => [0xFEF1, 0xFEF3, 0xFEF4, 0xFEF2], // Yeh
        0x067E => [0xFB56, 0xFB58, 0xFB59, 0xFB57], // Peh
        0x0686 => [0xFB7A, 0xFB7C, 0xFB7D, 0xFB7B], // Tcheh
        0x06A9 => [0xFB8E, 0xFB90, 0xFB91, 0xFB8F], // Keheh
        0x06AF => [0xFB92, 0xFB94, 0xFB95, 0xFB93], // Gaf
        0x06CC => [0xFbfc, 0xFbfe, 0xFbff, 0xFbfd], // Farsi Yeh
    ];

    private static $connects_before = [
        0x0622, 0x0623, 0x0624, 0x0625, 0x0627, 0x0628, 0x0629, 0x062A, 0x062B, 0x062C, 
        0x062D, 0x062E, 0x062F, 0x0630, 0x0631, 0x0632, 0x0633, 0x0634, 0x0635, 0x0636, 
        0x0637, 0x0638, 0x0639, 0x063A, 0x0641, 0x0642, 0x0643, 0x0644, 0x0645, 0x0646, 
        0x0647, 0x0648, 0x0649, 0x064A, 0x0626, 0x067E, 0x0686, 0x06A9, 0x06AF, 0x06CC
    ];

    private static $connects_after = [
        0x0628, 0x062A, 0x062B, 0x062C, 0x062D, 0x062E, 0x0633, 0x0634, 0x0635, 0x0636, 
        0x0637, 0x0638, 0x0639, 0x063A, 0x0641, 0x0642, 0x0643, 0x0644, 0x0645, 0x0646, 
        0x0647, 0x064A, 0x0626, 0x067E, 0x0686, 0x06A9, 0x06AF, 0x06CC
    ];

    public static function shape($text)
    {
        if (empty($text) || !is_string($text)) return $text;

        // Detect if the string contains Arabic characters
        if (!preg_match('/[\x{0600}-\x{06FF}]/u', $text)) {
            return $text;
        }

        // 1. Ligatures (Logical Order)
        $text = str_replace(
            [self::unichr(0x0644).self::unichr(0x0622), self::unichr(0x0644).self::unichr(0x0623), self::unichr(0x0644).self::unichr(0x0625), self::unichr(0x0644).self::unichr(0x0627)],
            [self::unichr(0xFEF5), self::unichr(0xFEF7), self::unichr(0xFEF9), self::unichr(0xFEFB)],
            $text
        );

        $chars = self::utf8_to_codes($text);
        $numChars = count($chars);
        $shapedChars = [];

        // 2. Contextual Shaping (Logical Order)
        for ($i = 0; $i < $numChars; $i++) {
            $current = $chars[$i];
            
            if (!isset(self::$map[$current])) {
                if ($current >= 0xFEF5 && $current <= 0xFEFB) {
                    $prev = ($i > 0) ? $chars[$i - 1] : null;
                    $connect_prev = $prev && (in_array($prev, self::$connects_after) || ($prev >= 0xFEF5 && $prev <= 0xFEFC));
                    $shapedChars[] = $connect_prev ? $current + 1 : $current;
                } else {
                    $shapedChars[] = $current;
                }
                continue;
            }

            $prev = ($i > 0) ? $chars[$i - 1] : null;
            $next = ($i < $numChars - 1) ? $chars[$i + 1] : null;

            $current_can_connect_prev = in_array($current, self::$connects_before);
            $current_can_connect_next = in_array($current, self::$connects_after);
            $prev_can_connect_next = $prev && (in_array($prev, self::$connects_after) || ($prev >= 0xFEF5 && $prev <= 0xFEFC));
            $next_can_connect_prev = $next && (in_array($next, self::$connects_before) || isset(self::$map[$next]));

            $connect_prev = $current_can_connect_prev && $prev_can_connect_next;
            $connect_next = $current_can_connect_next && $next_can_connect_prev;

            if ($connect_prev && $connect_next) {
                $shapedChars[] = self::$map[$current][2]; // Medial
            } elseif ($connect_prev) {
                $shapedChars[] = self::$map[$current][3]; // Final
            } elseif ($connect_next) {
                $shapedChars[] = self::$map[$current][1]; // Initial
            } else {
                $shapedChars[] = self::$map[$current][0]; // Isolated
            }
        }

        $logicalText = self::codes_to_utf8($shapedChars);

        // 3. Perfect Bidi Visual Reordering for LTR Canvas
        // Extract LTR phrases (Latin, Numbers, and their internal punctuation)
        $ltrPhrases = [];
        // Regex: Matches sequences of Latin/Numbers, optionally joined by spaces/punctuation
        $regex = '/[A-Za-z0-9]+(?:[-_., \/:]+[A-Za-z0-9]+)*/u';
        
        $placeholderText = preg_replace_callback($regex, function($matches) use (&$ltrPhrases) {
            $index = count($ltrPhrases);
            $ltrPhrases[$index] = $matches[0];
            return '{{' . $index . '}}';
        }, $logicalText);

        // Reverse the entire string (which now only contains RTL characters and placeholders)
        preg_match_all('/./us', $placeholderText, $ar);
        $reversedText = implode('', array_reverse($ar[0]));

        // Replace the reversed placeholders back with the original LTR phrases
        foreach ($ltrPhrases as $index => $phrase) {
            $reversedPlaceholder = '}}' . $index . '{{';
            $reversedText = str_replace($reversedPlaceholder, $phrase, $reversedText);
        }

        return $reversedText;
    }

    private static function shapeArabicBlock($text)
    {
        // Handle Lam-Alef ligatures before shaping (logical order)
        $text = str_replace(
            [self::unichr(0x0644).self::unichr(0x0622), self::unichr(0x0644).self::unichr(0x0623), self::unichr(0x0644).self::unichr(0x0625), self::unichr(0x0644).self::unichr(0x0627)],
            [self::unichr(0xFEF5), self::unichr(0xFEF7), self::unichr(0xFEF9), self::unichr(0xFEFB)],
            $text
        );

        $chars = self::utf8_to_codes($text);
        $shapedChars = [];
        $numChars = count($chars);

        for ($i = 0; $i < $numChars; $i++) {
            $current = $chars[$i];
            
            if (!isset(self::$map[$current])) {
                if ($current >= 0xFEF5 && $current <= 0xFEFB) {
                    $prev = ($i > 0) ? $chars[$i - 1] : null;
                    $current_can_connect_prev = in_array($current, self::$connects_before);
                    $prev_can_connect_next = $prev && in_array($prev, self::$connects_after);
                    $shapedChars[] = ($current_can_connect_prev && $prev_can_connect_next) ? $current + 1 : $current;
                } else {
                    $shapedChars[] = $current;
                }
                continue;
            }

            $prev = ($i > 0) ? $chars[$i - 1] : null;
            $next = ($i < $numChars - 1) ? $chars[$i + 1] : null;

            $current_can_connect_prev = in_array($current, self::$connects_before);
            $current_can_connect_next = in_array($current, self::$connects_after);
            $prev_can_connect_next = $prev && in_array($prev, self::$connects_after);
            $next_can_connect_prev = $next && in_array($next, self::$connects_before);

            $connect_prev = $current_can_connect_prev && $prev_can_connect_next;
            $connect_next = $current_can_connect_next && $next_can_connect_prev;

            if ($connect_prev && $connect_next) {
                $shapedChars[] = self::$map[$current][2]; // Medial
            } elseif ($connect_prev) {
                $shapedChars[] = self::$map[$current][3]; // Final
            } elseif ($connect_next) {
                $shapedChars[] = self::$map[$current][1]; // Initial
            } else {
                $shapedChars[] = self::$map[$current][0]; // Isolated
            }
        }

        return self::codes_to_utf8($shapedChars);
    }

    private static function utf8_to_codes($text)
    {
        $codes = [];
        $len = mb_strlen($text, 'UTF-8');
        for ($i = 0; $i < $len; $i++) {
            $char = mb_substr($text, $i, 1, 'UTF-8');
            $codes[] = self::uniord($char);
        }
        return $codes;
    }

    private static function codes_to_utf8($codes)
    {
        $text = '';
        foreach ($codes as $code) {
            $text .= self::unichr($code);
        }
        return $text;
    }

    private static function uniord($c)
    {
        $ord0 = ord($c[0]);
        if ($ord0 >= 0 && $ord0 <= 127) return $ord0;
        
        $utf32 = mb_convert_encoding($c, 'UTF-32BE', 'UTF-8');
        $unpack = unpack('N', $utf32);
        return reset($unpack);
    }

    private static function unichr($u)
    {
        return mb_convert_encoding(pack('N', intval($u)), 'UTF-8', 'UTF-32BE');
    }

    private static function utf8_rev($str)
    {
        preg_match_all('/./us', $str, $ar);
        return implode('', array_reverse($ar[0]));
    }
}
