<button class="closeBtn no-print" onclick="deleteBadge(<%=_id%>);" title="Delete badge">X</button>
<svg version="1.1" baseProfile="full" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <clipPath id="badge-cutoff<%=_id%>">
            <circle cx="150" cy="150" r="2.5cm" stroke="black" stroke-width="0.1mm" fill="transparent" />
        </clipPath>
        <clipPath id="badge-full<%=_id%>">
            <circle cx="150" cy="150" r="3cm" stroke="black" stroke-width="0.1mm" fill="transparent" />
        </clipPath>
        <path id="upper-path<%=_id%>" d="<%= upper_path %>" stroke="black" stroke-width="2" fill-opacity="0.5" />
        <path id="lower-path<%=_id%>" d="<%= lower_path %>" stroke="black" fill-opacity="0.5" />
    </defs>
    <image id="fgImg" xlink:href="picture_bg.jpg" x="-50" y="-50" height="400px" width="400px" clip-path="url(#badge-cutoff<%=_id%>)" />
    <image id="bgImg" xlink:href="picture_bg.jpg" x="-50" y="-50" height="400px" width="400px" style="opacity: 0.2" class="draggable no-print" />
    <circle cx="150" cy="150" r="3cm" stroke="black" stroke-width="0.1mm" stroke-dasharray="5,5" fill="transparent" />
    <!-- Tekst -->
    <g font-size="25" fill="white" text-anchor="middle">
        <text>
            <textPath xlink:href="#upper-path<%=_id%>" startOffset="50%" id="upper_text<%=_id%>" onclick="edit(<%=_id%>, 'upper_text')"><%= upper_text %></textPath>
            <textPath xlink:href="#lower-path<%=_id%>" startOffset="50%" id="lower_text<%=_id%>" onclick="edit(<%=_id%>, 'lower_text')"><%= lower_text %></textPath>
        </text>
    </g>
    <text x="150" y="175" font-size="60" text-anchor="middle" fill="white" id="middle_text<%=_id%>" onclick="edit(<%=_id%>, 'middle_text')"><%= middle_text %></text>
</svg>
