const Sidebar = props => {
  return (
    <Modal
      isOpen={open}
      className='sidebar-lg'
      toggle={handleAddEventSidebar}
      onOpened={handleSelectedEvent}
      onClosed={handleResetInputValues}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedEvent && selectedEvent.title && selectedEvent.title.length ? 'Update' : 'Add'} Event
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <Form
            onSubmit={handleSubmit(data => {
              if (data.title.length) {
                if (isObjEmpty(errors)) {
                  if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
                    handleAddEvent()
                  } else {
                    handleUpdateEvent()
                  }
                  handleAddEventSidebar()
                }
              } else {
                setError('title', {
                  type: 'manual'
                })
              }
            })}
          >
            <div className='mb-1'>
              <Label className='form-label' for='title'>
                Title <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Input id='title' placeholder='Title' invalid={errors.title && true} {...field} />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='label'>
                Label
              </Label>
              <Select
                id='label'
                value={calendarLabel}
                options={options}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                onChange={data => setCalendarLabel([data])}
                components={{
                  Option: OptionComponent
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='startDate'>
                Start Date
              </Label>
              <Flatpickr
                required
                id='startDate'
                name='startDate'
                className='form-control'
                onChange={date => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: 'Y-m-d H:i'
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='endDate'>
                End Date
              </Label>
              <Flatpickr
                required
                id='endDate'
                // tag={Flatpickr}
                name='endDate'
                className='form-control'
                onChange={date => setEndPicker(date[0])}
                value={endPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: 'Y-m-d H:i'
                }}
              />
            </div>

            <div className='form-switch mb-1'>
              <Input
                id='allDay'
                type='switch'
                className='me-1'
                checked={allDay}
                name='customSwitch'
                onChange={e => setAllDay(e.target.checked)}
              />
              <Label className='form-label' for='allDay'>
                All Day
              </Label>
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='eventURL'>
                Event URL
              </Label>
              <Input
                type='url'
                id='eventURL'
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder='https://www.google.com'
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='guests'>
                Guests
              </Label>
              <Select
                isMulti
                id='guests'
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                options={guestsOptions}
                theme={selectThemeColors}
                value={guests.length ? [...guests] : null}
                onChange={data => setGuests([...data])}
                components={{
                  Option: GuestsComponent
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='location'>
                Location
              </Label>
              <Input id='location' value={location} onChange={e => setLocation(e.target.value)} placeholder='Office' />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='description'>
                Description
              </Label>
              <Input
                type='textarea'
                name='text'
                id='description'
                rows='3'
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder='Description'
              />
            </div>
            <div className='d-flex mb-1'>
              <EventActions />
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  )
}

export default Sidebar
