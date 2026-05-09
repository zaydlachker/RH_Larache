<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            margin: 20px;
            direction: rtl;
            color: #000;
        }
        .header {
            width: 100%;
            margin-bottom: 20px;
            position: relative;
        }
        .header-right {
            text-align: center;
            width: 40%;
            float: right;
            font-weight: bold;
            font-size: 15px;
        }
        .header-left {
            width: 40%;
            float: left;
            text-align: right;
            padding-top: 30px;
        }
        .clear {
            clear: both;
        }
        .kingdom { color: red; }
        .ministry { color: green; }
        
        .title {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            margin-top: 40px;
            margin-bottom: 30px;
        }
        .section-title {
            text-decoration: underline;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .data-row {
            margin-bottom: 5px;
            display: flex;
        }
        .label {
            display: inline-block;
            width: 200px;
        }
        .value {
            display: inline-block;
            font-weight: normal;
        }
        .dotted-line {
            border-bottom: 1px dotted #000;
            display: inline-block;
            min-width: 200px;
        }
        .opinion-section {
            margin-top: 20px;
        }
        .opinion-title {
            text-decoration: underline;
            margin-bottom: 5px;
            display: block;
        }
        .opinion-lines {
            border-bottom: 1px dotted #000;
            height: 25px;
            margin-bottom: 10px;
            width: 100%;
        }
        .footer-checkboxes {
            margin-top: 30px;
            width: 100%;
        }
        .checkbox-container {
            display: inline-block;
            width: 48%;
        }
        .box {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #000;
            vertical-align: middle;
            margin-left: 10px;
        }
        .signature-area {
            text-align: center;
            margin-top: 40px;
        }
        .signature-title {
            text-decoration: underline;
            font-weight: bold;
        }
    </style>
</head>
<body>
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
                <p style="margin: 3px 0;">الانتساب المالي : م.ع.</p>
                <p style="margin: 3px 0;">رقم التأجير : {{ $employee->matricule ?? '-' }}</p>
                <p style="margin: 3px 0;">رقم ب.و.ت : {{ $employee->cnie ?? '-' }}</p>
                <p style="margin: 3px 0;">رقم : {{ $acte->reference ?? '-' }}</p>
            </td>
        </tr>
    </table>

    <div class="title">
        <div>بطاقة الترشيح لأجل الترقي بالاختيار إلى درجة <span class="dotted-line">{{ $avancement->new_grade ?? '-' }}</span> برسم سنة <span style="font-weight: bold;">{{ isset($avancement->date_effet) ? date('Y', strtotime($avancement->date_effet)) : date('Y') }}</span></div>
        <div>(نموذج خاص بهيئة متصرفي وزارة الداخلية)</div>
    </div>

    <div class="section">
        <div class="section-title">1- المعطيات الشخصية</div>
        <div class="data-row">
            <span class="label">الاسم الشخصي</span> : 
            <span class="value">{{ $employee->prenom ?? '-' }}</span>
        </div>
        <div class="data-row">
            <span class="label">الاسم العائلي</span> : 
            <span class="value">{{ $employee->nom ?? '-' }}</span>
        </div>
        <div class="data-row">
            <span class="label">تاريخ ومكان الازدياد</span> : 
            <span class="value">{{ $employee->date_naissance ?? '-' }} بـ {{ $employee->lieu_naissance ?? '-' }}</span>
        </div>
        <div class="data-row">
            <span class="label">الحالة العائلية</span> : 
            <span class="value">{{ $employee->situation_familiale ?? '-' }}</span>
        </div>
        <div class="data-row">
            <span class="label">رقم بطاقة التعريف الوطنية</span> : 
            <span class="value">{{ $employee->cnie ?? '-' }}</span>
        </div>
        <div class="data-row">
            <span class="label">رقم الهاتف</span> : 
            <span class="value">{{ $employee->telephone ?? '-' }}</span>
        </div>
        <div class="data-row">
            <span class="label">البريد الإلكتروني</span> : 
            <span class="value">{{ $employee->email ?? '-' }}</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">2- المعطيات الإدارية</div>
        <div class="data-row">
            <span class="label">رقم التأجير</span> : 
            <span class="value">{{ $employee->matricule ?? '-' }}</span>
        </div>
        <div class="data-row">
            <span class="label">تاريخ التوظيف</span> : 
            <span class="value">{{ $employee->date_recrutement ?? '-' }}</span>
        </div>
        
        <table style="width: 100%; margin-top: 5px; border: none;">
            <tr style="border: none;">
                <td style="width: 50%; border: none; text-align: right;">
                    <div class="data-row">
                        <span class="label" style="width: 100px;">الدرجة الحالية</span> : 
                        <span class="value">{{ $employee->grade ?? '-' }}</span>
                    </div>
                </td>
                <td style="width: 50%; border: none; text-align: right;">
                    <div class="data-row">
                        <span style="display:inline-block; width: 150px;">تاريخ التعيين في الدرجة :</span>
                        <span class="value">{{ $employee->date_recrutement ?? '-' }}</span>
                    </div>
                </td>
            </tr>
            <tr style="border: none;">
                <td style="border: none; text-align: right;">
                    <div class="data-row">
                        <span class="label" style="width: 100px;">الرتبة الحالية</span> : 
                        <span class="value">{{ $employee->echelon ?? '-' }}</span>
                    </div>
                </td>
                <td style="border: none; text-align: right;">
                    <div class="data-row">
                        <span style="display:inline-block; width: 150px;">تاريخ التعيين في الرتبة :</span>
                        <span class="value">{{ $employee->date_recrutement ?? '-' }}</span>
                    </div>
                </td>
            </tr>
        </table>

        <div class="data-row" style="margin-top: 10px; padding: 10px; background-color: #f9f9f9; border-right: 4px solid #003366;">
            <span style="font-weight: bold; margin-left: 20px;">الوضعية الجديدة المقترحة :</span>
            <span class="label" style="width: 80px;">الدرجة:</span> <span class="value" style="color: #006241; font-weight: bold;">{{ $avancement->new_grade ?? '-' }}</span>
            <span class="label" style="width: 80px; margin-right: 20px;">الرتبة:</span> <span class="value" style="color: #006241; font-weight: bold;">{{ $avancement->echelon ?? '-' }}</span>
            <span class="label" style="width: 100px; margin-right: 20px;">تاريخ المفعول:</span> <span class="value" style="color: #006241; font-weight: bold;">{{ isset($avancement->date_effet) ? date('d/m/Y', strtotime($avancement->date_effet)) : '-' }}</span>
        </div>
        
        <div class="data-row" style="margin-top: 10px;">
            <span class="label">مقر التعيين (Affectation)</span> : 
            <span class="value">{{ $employee->direction ?? '-' }}</span>
        </div>
    </div>

    <div class="opinion-section">
        <span class="opinion-title">- بيان مفصل عن المهام التي يقوم بها المعني(ة) بالأمر.</span>
        <div style="font-size: 12px; color: #333; min-height: 50px; border-bottom: 1px dotted #ccc;">{{ $acte->description ?? '-' }}</div>
    </div>

    <div class="opinion-section">
        <span class="opinion-title">- رأي الرئيس المباشر حول ترقية المعني(ة) بالأمر في الدرجة.</span>
        <div style="font-size: 12px; color: #333; min-height: 50px; border-bottom: 1px dotted #ccc;">موافق</div>
    </div>

    <div class="opinion-section">
        <span class="opinion-title">- نظرية رئيس القسم حول ترقية المعني(ة) بالأمر في الدرجة.</span>
        <div style="font-size: 12px; color: #333; min-height: 50px; border-bottom: 1px dotted #ccc;">موافق</div>
    </div>

    <div class="opinion-section">
        <span class="opinion-title">- النظرة العامة للسيد الوالي أو العامل حول ترقية المعني(ة) بالأمر في الدرجة.</span>
        <div style="font-size: 12px; color: #333; min-height: 50px; border-bottom: 1px dotted #ccc;">موافق</div>
    </div>

    <div class="footer-checkboxes">
        <div class="checkbox-container">
            <div class="box" style="text-align: center; line-height: 20px;">X</div>
            <span>1/ يقترح ترقية المعني(ة) بالأمر في الدرجة.</span>
        </div>
        <div class="checkbox-container">
            <div class="box" style="text-align: center; line-height: 20px;"></div>
            <span>2/ لا يقترح ترقية المعني(ة) بالأمر في الدرجة.</span>
        </div>
    </div>

    <div style="text-align: center; margin-top: 30px;">
        <span style="margin-left: 20px;">حرر بـ: العرائش بتاريخ: {{ $acte->issue_date ? $acte->issue_date->format('d/m/Y') : '-' }}</span>
    </div>

    <div class="signature-area">
        <span class="signature-title">توقيع السيد الوالي أو العامل</span>
    </div>

</body>
</html>
