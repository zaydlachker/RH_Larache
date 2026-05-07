<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            margin: 20px;
            direction: rtl;
            color: #111;
        }
        .header {
            text-align: center;
            margin-bottom: 18px;
        }
        .header p {
            margin: 2px 0;
            font-weight: 700;
        }
        .meta {
            margin: 18px 0 16px;
            font-weight: 700;
        }
        .meta p {
            margin: 4px 0;
        }
        .intro {
            margin: 8px 0 12px;
            font-weight: 700;
        }
        .law-list {
            margin: 0 0 12px;
            padding: 0 18px 0 0;
            list-style: none;
        }
        .law-list li {
            margin: 3px 0;
            text-indent: -16px;
            padding-right: 16px;
        }
        .decision-title {
            margin: 16px 0 8px;
            font-weight: 700;
            text-align: center;
        }
        .article {
            margin: 10px 0;
        }
        .article-title {
            font-weight: 700;
            display: block;
            margin-bottom: 3px;
        }
        .situation-container {
            width: 100%;
            margin: 16px 0;
        }
        .situation-label {
            font-weight: 700;
            text-align: center;
            padding: 8px;
            background: #f0f0f0;
            border: 1px solid #333;
        }
        .situation-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }
        .situation-table th,
        .situation-table td {
            border: 1px solid #333;
            padding: 6px 10px;
            text-align: center;
            font-size: 12px;
        }
        .situation-table th {
            background: #f5f5f5;
            font-weight: 700;
        }
        .grade-row {
            text-align: right;
            font-weight: 700;
            padding: 6px 10px;
            border: 1px solid #333;
        }
        .duration-box {
            text-align: center;
            margin: 10px 0;
            font-weight: 700;
        }
        .main-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
        }
        .main-table td {
            border: 1px solid #333;
            vertical-align: top;
        }
        .signature {
            margin-top: 28px;
            text-align: left;
            font-weight: 700;
        }
    </style>
</head>
<body>
    {{-- ═══ En-tête institutionnel ═══ --}}
    <table style="width: 100%; margin-bottom: 20px; border: none;">
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
                الانتساب المالي : م.ع.<br>
                رقم التسجيل : {{ $recrutement->reference_acte ?? '................' }}<br>
                رقم ب.و.ت : {{ $fonctionnaire->cin ?? $fonctionnaire->cnie ?? '................' }}<br>
                الرقم ا.ص.م.ت : {{ $fonctionnaire->matricule ?? '................' }}
            </td>
        </tr>
    </table>

    <div style="text-align: center; font-weight: bold; margin-bottom: 20px;">
        قرار رقم: {{ $recrutement->reference_acte ?? $acte->reference ?? '................' }} ، بتاريخ: {{ $recrutement->date_acte ?? $date_formatted ?? '................' }}<br>
        إن رئيس جماعة العرائش
    </div>

    <ul class="law-list" style="text-align: justify; margin-right: 20px;">
        <li>• بناء على الظهير الشريف رقم 1.15.85، الصادر في 20 رمضان 1436 (2015.07.07)، بتنفيذ القانون التنظيمي رقم 113.14 المتعلق بالجماعات.</li>
        <li>• بناء على الظهير الشريف رقم 1.58.008، الصادر بتاريخ 4 شعبان 1377 (1958.02.24)، بمثابة النظام الأساسي العام للوظيفة العمومية، كما وقع تغييره وتتميمه.</li>
        <li>• بناء على المرسوم 2.17.451، الصادر في 4 ربيع الأول 1439 (2017.11.23)، بسن نظام للمحاسبة العمومية للجماعات ومؤسسات التعاون بين الجماعات.</li>
        <li>• بناء على المرسوم 2.77.738، الصادر بتاريخ 13 شوال 1397 (1977.09.27)، بمثابة النظام الأساسي لموظفي الجماعات المحلية، كما تم تعديله وتتميمه.</li>
        <li>• بناء على المرسوم رقم 2.05.72، الصادر بتاريخ 29 شوال 1426 (2005.12.02)، بشأن النظام الأساسي الخاص بهيئة التقنيين المشتركة بين الوزارات، كما وقع تغييره وتتميمه.</li>
        <li>• بناء على المرسوم رقم 2.62.344، الصادر بتاريخ 15 صفر 1383 (1963.07.08)، بتحديد سلالم الأجور وشروط ترقي موظفي الدولة في الرتبة والدرجة، كما وقع تغييره وتتميمه.</li>
        <li>• بناء على المرسوم رقم 2.05.1367، الصادر بتاريخ 29 شوال 1426 (2005.12.02)، بتحديد مسطرة تنقيط وتقييم موظفي الإدارات العمومية.</li>
        <li>• بناء على المرسوم الملكي 62.68 الصادر في 19 صفر 1388 (1968.05.17) المحدد للمقتضيات المطبقة على الموظفين المتمرنين بالإدارات العمومية.</li>
        <li>• بناء على القانون رقم 011.71 الصادر في 12 ذي القعدة 1391 (1971.12.30) المحدث بموجبه نظام المعاشات المدنية، كما وقع تغييره وتتميمه.</li>
        <li>• بناء على الشهادة ({{ $recrutement->diplome ?? '................' }}) التي حصل(ت) عليها السيد(ة) {{ $fonctionnaire->first_name ?? $fonctionnaire->prenom ?? '......' }} {{ $fonctionnaire->last_name ?? $fonctionnaire->nom ?? '......' }} في تخصص {{ $recrutement->specialite ?? '................' }} بتاريخ {{ $recrutement->date_diplome ?? '................' }}.</li>
        <li>• بناء على {{ $recrutement->type_recrutement === 'concours' ? 'نتائج المباراة المنظمة' : 'المراسلة رقم ' . ($recrutement->num_telegramme ?? '........') }} الصادرة بتاريخ {{ $recrutement->date_telegramme ?? '................' }}.</li>
        <li>• وبناء على تقرير شروع المعني(ة) بالأمر في العمل بجماعة العرائش بتاريخ {{ $recrutement->date_recrutement ?? '................' }}.</li>
    </ul>

    <div style="text-align: center; font-weight: bold; font-size: 16px; margin: 20px 0; text-decoration: underline;">
        يقــــــــــــرر:
    </div>

    <div style="margin-bottom: 10px; text-align: justify; line-height: 1.6;">
        <span style="font-weight: bold; text-decoration: underline;">الفصل الأول:</span> 
        ابتداء من {{ $recrutement->date_effet ?? '................' }} يعين/تعين السيد(ة) {{ $fonctionnaire->first_name ?? $fonctionnaire->prenom ?? '......' }} {{ $fonctionnaire->last_name ?? $fonctionnaire->nom ?? '......' }} ، المزداد(ة) بتاريخ {{ $fonctionnaire->birth_date ?? $fonctionnaire->date_naissance ?? '................' }} ، موظف(ة) بجماعة العرائش بدرجة {{ $recrutement->grade_recrutement ?? '................' }}، السلم {{ $recrutement->echelle_recrutement ?? '...' }}، الرتبة {{ $recrutement->echelon_recrutement ?? '...' }} الرقم الاستدلالي {{ $recrutement->indice_recrutement ?? '...' }}، وذلك بـ {{ $recrutement->service_affectation ?? '................' }} بصفة متمرن.
    </div>

    <div style="margin-bottom: 10px; text-align: justify; line-height: 1.6;">
        <span style="font-weight: bold; text-decoration: underline;">الفصل الثاني:</span> يرسم/ترسم المعني(ة) بالأمر بعد قضاء فترة التمرين القانونية، وبتوفر شرط الكفاءة المهنية.
    </div>

    <div style="margin-bottom: 10px; text-align: justify; line-height: 1.6;">
        <span style="font-weight: bold; text-decoration: underline;">الفصل الثالث:</span> يعهد بتنفيذ هذا القرار إلى مدير المصالح وقسم الموارد البشرية والجهات المعنية كل في حدود اختصاصه.
    </div>

    <div class="signature" style="margin-top: 40px;">
        <p>حرر بالعرائش في: {{ $recrutement->date_acte ?? $date_formatted }}</p>
        <p>{{ $recrutement->signataire ?? 'رئيس جماعة العرائش' }}</p>
    </div>
</body>
</html>
