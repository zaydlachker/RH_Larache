<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        @page { margin: 15mm 20mm; }
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            line-height: 1.8;
            margin: 0;
            direction: rtl;
            color: #111;
        }
        .top-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
        }
        .top-table td {
            vertical-align: top;
            border: none;
        }
        .header-left {
            text-align: center;
            font-weight: 700;
            line-height: 1.4;
            width: 60%;
        }
        .header-right {
            text-align: left;
            line-height: 1.4;
            width: 40%;
        }
        .title {
            text-align: center;
            margin: 15px 0 10px;
            font-weight: 700;
            line-height: 1.8;
            font-size: 14px;
        }
        .laws {
            margin: 10px 0 15px;
            padding: 0 16px 0 0;
            list-style: none;
        }
        .laws li {
            margin: 5px 0;
            text-indent: -13px;
            padding-right: 13px;
            text-align: justify;
        }
        .decision {
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            margin: 15px 0;
            text-decoration: underline;
        }
        .article {
            margin: 10px 0;
            text-align: justify;
        }
        .article-title {
            font-weight: 700;
            text-decoration: underline;
        }
        .comparison {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .comparison th, .comparison td {
            border: 1px solid #333;
            padding: 8px 5px;
            text-align: center;
            font-size: 11.5px;
        }
        .comparison th {
            font-weight: 700;
            background: #f5f5f5;
        }
        .section-header {
            font-weight: 700;
            background: #efefef;
        }
        .signature {
            margin-top: 30px;
            text-align: left;
            font-weight: 700;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <table class="top-table">
        <tr>
            <td class="header-left">
                المملكة المغربية<br>
                وزارة الداخلية<br>
                ولاية جهة طنجة تطوان الحسيمة<br>
                عمالة إقليم العرائش<br>
                جماعة العرائش<br>
                مديرية المصالح<br>
                قسم الموارد البشرية
            </td>
            <td class="header-right">
                الانتساب المالي : م.ع.<br>
                رقم التأجير : {{ $employee->matricule ?? '........' }}<br>
                رقم ب.و.ت : {{ $employee->cnie ?? '........' }}<br>
                الرقم ا.ص.م.ت : {{ $employee->matricule ?? '........' }}
            </td>
        </tr>
    </table>

    <div class="title">
        قرار رقم {{ $acte->reference ?? '........' }} بتاريخ {{ $acte->issue_date->format('d/m/Y') }}<br>
        إن رئيس جماعة العرائش
    </div>

    <ul class="laws">
        <li>• بناء على الظهير الشريف رقم 1.15.85 الصادر في 20 رمضان 1436 (2015.07.07) بتنفيذ القانون التنظيمي رقم 113.14 المتعلق بالجماعات.</li>
        <li>• بناء على الظهير الشريف رقم 1.58.008 الصادر بتاريخ 4 شعبان 1377 (1958.02.24) بمثابة النظام الأساسي العام للوظيفة العمومية كما وقع تغييره وتتميمه.</li>
        <li>• بناء على المرسوم رقم 2.77.738 الصادر بتاريخ 13 شوال 1397 (1977.09.27) بمثابة النظام الأساسي لموظفي الجماعات المحلية كما تم تعديله وتتميمه.</li>
        <li>• بناء على المرسوم رقم 2.05.72 الصادر بتاريخ 29 شوال 1426 (2005.12.02) بشأن النظام الأساسي الخاص بهيئة التقنيين المشتركة بين الوزارات.</li>
        <li>• بناء على المرسوم رقم 2.62.344 الصادر بتاريخ 15 صفر 1383 (1963.07.08) بتحديد سلالم الأجور وشروط الترقي في الرتبة والدرجة.</li>
        <li>• بناء على المرسوم رقم 2.05.1367 الصادر بتاريخ 29 شوال 1426 (2005.12.02) بتحديد مسطرة تنقيط وتقييم موظفي الإدارات العمومية.</li>
        <li>• بناء على المرسوم الملكي رقم 62.68 الصادر في 19 صفر 1388 (1968.05.17) المحدد للمقتضيات المطبقة على الموظفين المتمرنين بالإدارات العمومية.</li>
        <li>• بناء على تقرير التقييم الإيجابي للسيد(ة) {{ $employee->prenom ?? '......' }} {{ $employee->nom ?? '......' }} خلال فترة التمرين.</li>
    </ul>

    <div class="decision">يقــــــرر</div>

    <div class="article">
        <span class="article-title">الفصل الأول:</span>
        يتم ترسيم السيد(ة) {{ $employee->prenom ?? '......' }} {{ $employee->nom ?? '......' }} المزداد(ة) بتاريخ {{ $employee->date_naissance ?? '........' }} 
        وذلك ابتداء من {{ $record->date_effet ?? '........' }} 
        بعد قضاء فترة التدريب المحددة في 12 شهر
        في درجة {{ $record->grade ?? $employee->grade ?? '........' }} السلم
        ....... الرتبة
        ....... الرقم الاستدلالي
        .......
    </div>

    <div class="article">
        <span class="article-title">الفصل الثاني:</span>
        يعتبر المعني(ة) مرسمًا في أسلاك الوظيفة العمومية ابتداءً من التاريخ المذكور أعلاه، بعد نجاحه(ها) في فترة التدريب.
    </div>

    <div class="article">
        <span class="article-title">الفصل الثالث:</span>
        يكلف بتنفيذ هذا القرار الجهات المختصة كل في حدود اختصاصه.
    </div>

    <table class="comparison">
        <tr>
            <th colspan="4" class="section-header">الوضعية القديمة</th>
            <th rowspan="3" class="section-header">المدة</th>
            <th colspan="4" class="section-header">الوضعية الجديدة</th>
        </tr>
        <tr>
            <th colspan="4">الدرجة: {{ $employee->grade ?? '...' }}</th>
            <th colspan="4">الدرجة: {{ $record->grade ?? $employee->grade ?? '...' }}</th>
        </tr>
        <tr>
            <th>السلم</th>
            <th>الرتبة</th>
            <th>الرقم الاستدلالي</th>
            <th>تاريخ التوظيف</th>
            <th>السلم</th>
            <th>الرتبة</th>
            <th>الرقم الاستدلالي</th>
            <th>تاريخ المفعول</th>
        </tr>
        <tr>
            <td>...</td>
            <td>{{ $employee->echelon ?? '...' }}</td>
            <td>...</td>
            <td>{{ $employee->date_recrutement ?? '........' }}</td>
            <td>12 شهر</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>{{ $record->date_effet ?? '........' }}</td>
        </tr>
    </table>

    <div class="signature" style="margin-top: 40px;">
        <p>حرر بالعرائش في: {{ $acte->issue_date->format('d/m/Y') }}</p>
        <p>رئيس جماعة العرائش</p>
    </div>
</body>
</html>
