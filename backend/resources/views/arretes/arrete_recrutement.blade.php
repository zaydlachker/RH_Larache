<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 13px; line-height: 1.8; margin: 30px; direction: rtl; color: #111; }
        .header { text-align: center; margin-bottom: 20px; }
        .meta { margin: 10px 0 20px; font-weight: 700; }
        .title { text-align: center; margin: 20px 0; font-weight: 700; font-size: 16px; text-decoration: underline; }
        .intro { margin: 10px 0; font-weight: 700; }
        .law-list { margin: 0 0 20px; padding: 0 20px 0 0; list-style: none; }
        .law-list li { margin: 5px 0; }
        .decision { text-align: center; margin: 20px 0; font-weight: 700; font-size: 18px; }
        .article { margin: 15px 0; text-align: justify; }
        .article-title { font-weight: 700; text-decoration: underline; }
        .signature { margin-top: 40px; text-align: left; font-weight: 700; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid #333; padding: 8px; text-align: center; }
        th { background: #f5f5f5; }
    </style>
</head>
<body>
    <table style="width: 100%; margin-bottom: 20px; border: none;">
        <tr>
            <td style="width: 50%; vertical-align: top; text-align: center; font-weight: bold; border: none;">
                المملكة المغربية<br>
                وزارة الداخلية<br>
                ولاية جهة طنجة تطوان الحسيمة<br>
                عمالة إقليم العرائش<br>
                جماعة العرائش
            </td>
            <td style="width: 50%; vertical-align: top; text-align: left; border: none;">
                رقم التأجير : {{ $employee->matricule ?? '-' }}<br>
                رقم ب.و.ت : {{ $employee->cnie ?? '-' }}<br>
                المرجع : {{ $acte->reference ?? '-' }}
            </td>
        </tr>
    </table>

    <div class="title">قرار توظيف</div>

    <div class="intro">إن رئيس جماعة العرائش،</div>

    <ul class="law-list">
        <li>• بناء على القانون التنظيمي رقم 113.14 المتعلق بالجماعات؛</li>
        <li>• بناء على النظام الأساسي العام للوظيفة العمومية؛</li>
        <li>• بناء على نتائج مباراة التوظيف المنظمة بتاريخ {{ $contenu['date_concours'] ?? ($acte->issue_date ? $acte->issue_date->format('d/m/Y') : '-') }}؛</li>
    </ul>

    <div class="decision">يقرر ما يلي:</div>

    <div class="article">
        <span class="article-title">الفصل الأول:</span>
        يوظف السيد(ة) {{ $employee->prenom ?? '-' }} {{ $employee->nom ?? '-' }} المزداد(ة) بتاريخ {{ $employee->date_naissance ?? '-' }}
        بجماعة العرائش ابتداء من {{ $contenu['date_effet'] ?? '-' }} 
        في درجة {{ $contenu['new_grade'] ?? '-' }} 
        السلم {{ $contenu['echelle'] ?? '-' }} 
        الرتبة {{ $contenu['echelon'] ?? '-' }}.
    </div>

    <div class="article">
        <span class="article-title">الفصل الثاني:</span>
        يعين المعني(ة) بالأمر بـ {{ $employee->direction ?? '-' }}.
    </div>

    <div class="signature">
        حرر بالعرائش في: {{ $date_formatted ?? '-' }}<br>
        رئيس جماعة العرائش
    </div>
</body>
</html>
