<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            line-height: 1.8;
            margin: 30px 40px;
            direction: rtl;
            color: #111;
        }
        .title {
            text-align: center;
            font-weight: bold;
            font-size: 14px;
            margin: 10px 0 5px;
        }
        .subtitle {
            text-align: center;
            font-size: 11px;
            margin-bottom: 20px;
        }
        .section-title {
            font-weight: bold;
            font-size: 13px;
            margin: 18px 0 8px;
            text-decoration: underline;
        }
        .field-row {
            margin: 4px 0;
            display: block;
        }
        .field-label {
            font-weight: bold;
            display: inline;
        }
        .field-dots {
            display: inline;
            border-bottom: 1px dotted #555;
            min-width: 200px;
            padding-bottom: 1px;
        }
        .admin-grid {
            width: 100%;
            border: none;
        }
        .admin-grid td {
            border: none;
            vertical-align: top;
            padding: 2px 5px;
        }
        .opinion-section {
            margin: 12px 0;
            font-weight: bold;
            text-align: justify;
            line-height: 1.6;
        }
        .opinion-line {
            border-bottom: 1px solid #888;
            min-height: 30px;
            margin: 5px 0 15px;
        }
        .decision-box {
            margin: 20px 0;
            border: 1px solid #333;
            padding: 12px 20px;
        }
        .decision-item {
            display: inline-block;
            width: 48%;
            text-align: right;
            font-weight: bold;
            padding: 5px 0;
        }
        .checkbox {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 1.5px solid #333;
            margin-left: 8px;
            vertical-align: middle;
        }
        .signature {
            margin-top: 30px;
            text-align: left;
            font-weight: bold;
        }
    </style>
</head>
<body>

    {{-- ═══ En-tête institutionnel ═══ --}}
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
                <p style="margin: 3px 0;">الرقم ا.ص.م.ت : {{ $fonctionnaire->matricule ?? '................' }}</p>
            </td>
        </tr>
    </table>

    {{-- ═══ عنوان البطاقة ═══ --}}
    <div class="title">
        بطاقة الترشيح لأجل الترقي بالاختيار إلى درجة {{ $reclassement->nouveau_grade ?? '..................' }} برسم سنة {{ now()->format('Y') }}
    </div>
    <div class="subtitle">
        (نموذج خاص بهيئة متصرف وزارة الداخلية)
    </div>

    {{-- ═══ 1- المعطيات الشخصية ═══ --}}
    <div class="section-title">1- المعطيات الشخصية</div>

    <div class="field-row">
        <span class="field-label">الاسم الشخصي : </span>
        {{ $fonctionnaire->prenom ?? '............................................' }}
    </div>
    <div class="field-row">
        <span class="field-label">الاسم العائلي : </span>
        {{ $fonctionnaire->nom ?? '............................................' }}
    </div>
    <div class="field-row">
        <span class="field-label">تاريخ ومكان الازدياد : </span>
        {{ $fonctionnaire->date_naissance ?? '................' }}
        بـ {{ $fonctionnaire->lieu_naissance ?? '................' }}
    </div>
    <div class="field-row">
        <span class="field-label">الحالة العائلية : </span>
        {{ $fonctionnaire->situation_familiale ?? '............................................' }}
    </div>
    <div class="field-row">
        <span class="field-label">رقم بطاقة التعريف الوطنية : </span>
        {{ $fonctionnaire->cnie ?? '............................................' }}
    </div>
    <div class="field-row">
        <span class="field-label">رقم الهاتف : </span>
        {{ $fonctionnaire->telephone ?? '............................................' }}
    </div>
    <div class="field-row">
        <span class="field-label">البريد الإلكتروني : </span>
        {{ $fonctionnaire->email ?? '............................................' }}
    </div>
    <div class="field-row">
        <span class="field-label">رقم التأجير : </span>
        {{ $fonctionnaire->matricule ?? '............................................' }}
    </div>

    {{-- ═══ 2- المعطيات الإدارية ═══ --}}
    <div class="section-title">2- المعطيات الإدارية</div>

    <table class="admin-grid">
        <tr>
            <td style="width: 55%;">
                <div class="field-row">
                    <span class="field-label">تاريخ التوظيف : </span>
                    {{ $fonctionnaire->recruitment_date ?? $fonctionnaire->date_recrutement ?? '................' }}
                </div>
                <div class="field-row">
                    <span class="field-label">الدرجة الحالية : </span>
                    {{ $reclassement->ancien_grade ?? $fonctionnaire->grade ?? '................' }}
                </div>
                <div class="field-row">
                    <span class="field-label">الرتبة الحالية : </span>
                    {{ $reclassement->ancien_echelon ?? $fonctionnaire->echelon ?? '......' }}
                </div>
                <div class="field-row">
                    <span class="field-label">مقر التعيين : </span>
                    {{ $fonctionnaire->direction ?? 'جماعة العرائش' }}
                </div>
            </td>
            <td style="width: 45%;">
                <div class="field-row">
                    <span class="field-label">تاريخ المفعول : </span>
                    {{ $reclassement->date_effet ?? '................' }}
                </div>
                <div class="field-row">
                    <span class="field-label">الدرجة الجديدة : </span>
                    {{ $reclassement->nouveau_grade ?? '................' }}
                </div>
                <div class="field-row">
                    <span class="field-label">الرتبة الجديدة : </span>
                    {{ $reclassement->nouvel_echelon ?? '................' }}
                </div>
            </td>
        </tr>
    </table>

    {{-- ═══ بيان مفصل ═══ --}}
    <div class="opinion-section">
        - بيان مفصل عن المهام التي يقوم بها المعني(ة) بالأمر:
    </div>
    <div style="font-size: 11px; padding: 5px; border-bottom: 1px dotted #ccc;">
        {{ $reclassement->description_missions ?? '..........................................................................................................................................' }}
    </div>

    {{-- ═══ رأي الرئيس المباشر ═══ --}}
    <div class="opinion-section">
        - رأي الرئيس المباشر حول ترقية المعني(ة) بالأمر في الدرجة:
    </div>
    <div style="font-size: 11px; padding: 5px; border-bottom: 1px dotted #ccc;">
        {{ $reclassement->avis_superieur ?? '..........................................................................................................................................' }}
    </div>

    {{-- ═══ نظرية رئيس القسم ═══ --}}
    <div class="opinion-section">
        - نظرية رئيس القسم حول ترقية المعني(ة) بالأمر في الدرجة:
    </div>
    <div style="font-size: 11px; padding: 5px; border-bottom: 1px dotted #ccc;">
        {{ $reclassement->avis_chef ?? '..........................................................................................................................................' }}
    </div>

    {{-- ═══ النظرية العامة ═══ --}}
    <div class="opinion-section">
        - النظرية العامة للسيد الوالي أو العامل:
    </div>
    <div style="font-size: 11px; padding: 5px; border-bottom: 1px dotted #ccc;">
        {{ $reclassement->avis_admin ?? '..........................................................................................................................................' }}
    </div>

    {{-- ═══ القرار ═══ --}}
    <div class="decision-box">
        <span class="decision-item">
            <span class="checkbox" style="background-color: {{ ($reclassement->decision ?? '') === 'propose' ? '#000' : 'transparent' }}"></span>
            1/ يُقترح ترقية المعني(ة) بالأمر في الدرجة.
        </span>
        <span class="decision-item">
            <span class="checkbox" style="background-color: {{ ($reclassement->decision ?? '') === 'no_propose' ? '#000' : 'transparent' }}"></span>
            2/ لا يُقترح ترقية المعني(ة) بالأمر في الدرجة.
        </span>
    </div>

    {{-- ═══ التوقيع ═══ --}}
    <div class="signature">
        <p>{{ $reclassement->signataire ?? 'رئيس جماعة العرائش' }}</p>
        <p style="margin-top: 5px;">حرر بالعرائش بتاريخ: {{ $reclassement->date_redaction ?? $date_formatted ?? '................' }}</p>
    </div>

</body>
</html>
