<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 13px; line-height: 1.85; margin: 34px; direction: rtl; color: #111; }
        .header { text-align: center; margin-bottom: 18px; }
        .header p { margin: 0; font-weight: 700; }
        .subheader { margin: 18px 0 12px; }
        .subheader p { margin: 2px 0; font-weight: 700; }
        .meta { margin: 8px 0 16px; font-weight: 700; }
        .meta p { margin: 4px 0; }
        .title { text-align: center; margin: 14px 0; font-weight: 700; }
        .intro { margin: 8px 0 12px; font-weight: 700; }
        .law-list { margin: 0 0 12px; padding: 0 18px 0 0; list-style: none; }
        .law-list li { margin: 5px 0; text-indent: -16px; padding-right: 16px; }
        .decision-title { margin: 16px 0 8px; font-weight: 700; text-align: center; }
        .article { margin: 10px 0; }
        .article-title { font-weight: 700; display: block; margin-bottom: 3px; }
        .signature { margin-top: 28px; text-align: left; font-weight: 700; }
    </style>
</head>
<body>
    <table style="width: 100%; margin-bottom: 15px; border: none;">
        <tr>
            <td style="width: 50%; vertical-align: top; text-align: center; font-weight: bold; line-height: 1.5; border: none;">
                المملكة المغربية<br>
                وزارة الداخلية<br>
                ولاية جهة طنجة تطوان الحسيمة<br>
                عمالة إقليم العرائش<br>
                جماعة العرائش<br>
                مديرية المصالح<br>
                قسم الموارد البشرية
            </td>
            <td style="width: 50%; vertical-align: top; text-align: left; line-height: 1.5; border: none;">
                <p style="margin: 3px 0;">الانتساب المالي : م.ع.</p>
                <p style="margin: 3px 0;">رقم التأجير : {{ $fonctionnaire->matricule ?? '................' }}</p>
                <p style="margin: 3px 0;">رقم ب.و.ت : {{ $fonctionnaire->cnie ?? '................' }}</p>
                <p style="margin: 3px 0;">الرقم ا.ص.مت : {{ $fonctionnaire->matricule ?? '................' }}</p>
            </td>
        </tr>
    </table>

    <div class="meta">
        <p>قرار رقم: {{ $nomination->acte_reference ?? $acte->reference ?? '……' }} بتاريخ: {{ $nomination->date_decision ?? $date_formatted ?? '……' }}</p>
    </div>

    <div class="intro">إن رئيس جماعة العرائش،</div>

    <ul class="law-list">
        <li>• بناء على الظهير الشريف رقم 1.15.85 الصادر في 20 رمضان 1436 (07.07.2015) بتنفيذ القانون التنظيمي المتعلق بالجماعات؛</li>
        <li>• بناء على الظهير الشريف رقم 1.58.008 الصادر بتاريخ 4 شعبان 1377 (24.02.1958) بمثابة النظام الأساسي العام للوظيفة العمومية كما وقع تغييره وتتميمه؛</li>
        <li>• بناء على المرسوم رقم 2.17.451 الصادر في 4 ربيع الأول 1439 (23.11.2017) بشأن نظام المحاسبة العمومية للجماعات ومؤسسات التعاون بين الجماعات؛</li>
        <li>• بناء على المرسوم رقم 2.77.738 الصادر بتاريخ 13 شوال 1397 (27.09.1977) بمثابة النظام الأساسي لموظفي الجماعات المحلية كما تم تغييره وتتميمه؛</li>
        <li>• بناء على المرسوم رقم 2.05.72 الصادر بتاريخ 29 شوال 1426 (02.12.2005) بشأن النظام الأساسي الخاص بهيئة التقنيين المشتركة بين الوزارات كما وقع تغييره وتتميمه؛</li>
        <li>• بناء على المرسوم رقم 2.62.344 الصادر بتاريخ 15 صفر 1383 (08.07.1963) بتحديد سلالم الأجور وشروط الترقي في الرتبة والدرجة لموظفي الدولة؛</li>
        <li>• بناء على المرسوم رقم 2.05.1367 الصادر بتاريخ 29 شوال 1426 (02.12.2005) بتحديد مسطرة تنقيط وتقييم موظفي الإدارات العمومية؛</li>
        <li>• بناء على المرسوم الملكي رقم 62.68 الصادر في 19 صفر 1388 (17.05.1968) المحدد للمقتضيات المطبقة على الموظفين المتدربين بالإدارات العمومية؛</li>
        <li>• بناء على القانون رقم 011.71 الصادر في 12 ذي القعدة 1391 (30.12.1971) المحدث بموجبه نظام المعاشات المدنية كما وقع تغييره وتتميمه؛</li>
        <li>• بناء على الشهادات والمؤهلات التي حصل عليها السيد(ة) {{ $fonctionnaire->prenom ?? '…' }} {{ $fonctionnaire->nom ?? '…' }}؛</li>
        <li>• وبناء على تقرير شروع المعنية بالأمر في العمل بجماعة العرائش بتاريخ {{ $nomination->date_prise_service ?? $contenu['date_prise_service'] ?? '................' }}؛</li>
    </ul>

    <div class="decision-title">يقرر:</div>

    <div class="article">
        <span class="article-title">الفصل الأول:</span>
        <p>
            يبتدئ من {{ $nomination->date_effet ?? $contenu['date_effet'] ?? $date_formatted ?? '................' }}
            {{ $nomination->type_nomination === 'nomination' ? 'تعيين' : ($nomination->type_nomination === 'promotion' ? 'ترقية' : 'تعيين') }}
            السيد(ة) {{ $fonctionnaire->prenom ?? '…' }} {{ $fonctionnaire->nom ?? '…' }}
            بجماعة العرائش في الدرجة الجديدة:
            {{ $nomination->nouveau_grade ?? $fonctionnaire->grade ?? '................' }}،
            {{ $nomination->nouvel_echelon ? 'الرتبة ' . $nomination->nouvel_echelon : '................' }}،
            الرقم الاستدلالي {{ $nomination->indice ?? $contenu['indice'] ?? '................' }}،
            وذلك بـ {{ $nomination->service ?? $fonctionnaire->direction ?? '................' }}.
        </p>
    </div>

    <div class="article">
        <span class="article-title">الفصل الثاني:</span>
        <p>ترسم المعنية بالأمر بعد قضاء فترة التمرين القانونية، ويتوقف ذلك على توفر شرط الكفاءة المهنية والنتائج المحصل عليها.</p>
    </div>

    <div class="article">
        <span class="article-title">الفصل الثالث:</span>
        <p>يعهد بتنفيذ هذا القرار إلى مدير المصالح وقسم الموارد البشرية والجهات المعنية كل في حدود اختصاصه.</p>
    </div>

    <div class="signature">
        <p>حرر بالعرائش في: {{ $nomination->date_redaction ?? $date_formatted }}</p>
        <p>رئيس جماعة العرائش</p>
    </div>
</body>
</html>
